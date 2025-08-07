import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import type { GoogleUserInfo, GoogleTokenResponse, GoogleTokenClient, LoginRequest } from '@/types/auth';

export function useGoogleAuth() {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  /**
   * Google 로그인 처리 - axios 사용!
   */
  async function handleGoogleLogin(): Promise<void> {
    if (isLoading) return;
    let userInfo: GoogleUserInfo | undefined;

    try {
      setIsLoading(true);

      // 1. Google 서비스 확인
      if (!window.google?.accounts?.oauth2) {
        throw new Error('Google OAuth 서비스가 로드되지 않았습니다.');
      }

      // 2. Google 팝업 로그인
      userInfo = await new Promise<GoogleUserInfo>((resolve, reject) => {
        const tokenClient: GoogleTokenClient = window.google!.accounts!.oauth2!.initTokenClient({
          client_id: googleClientId,
          scope: 'openid email profile',
          callback: async (response: GoogleTokenResponse) => {
            try {
              if (response.error) {
                reject(new Error(`Google login error: ${response.error}`));
                return;
              }

              if (!response.access_token) {
                reject(new Error('No access token received'));
                return;
              }

              // 사용자 정보 가져오기
              const userResponse = await fetch(
                  'https://www.googleapis.com/oauth2/v2/userinfo',
                  {
                    headers: {
                      'Authorization': `Bearer ${response.access_token}`
                    }
                  }
                );
              
              if (!userResponse.ok) {
                throw new Error('Failed to fetch user info');
              }

              const userInfo = await userResponse.json();
              resolve(userInfo);
            } catch (error) {
              reject(error);
            }
          },
        });

        tokenClient.requestAccessToken();
      });

      // 3. 백엔드 로그인 - axios 직접 사용
      const loginData: LoginRequest = {
        provider: "google",
        socialId: userInfo.id,
      };

      console.log('=== axios 로그인 요청 ===');
      console.log('요청 URL:', `${import.meta.env.VITE_API_BASE_URL}/auth/login`);
      console.log('요청 데이터:', loginData);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        loginData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      // 404는 신규 사용자
      if (response.status === 404) {
        console.log('신규 사용자 - 회원가입 페이지로 이동');
        sessionStorage.setItem('tempGoogleId', userInfo.id);
        navigate('/signup');
        return;
      }

      // 4. 토큰 저장 - axios에서는 headers 객체로 접근
      let accessToken: string | null = response.headers.authorization;
      
      if (!accessToken) {
        console.error('❌ 토큰을 찾을 수 없습니다!');
        console.error('헤더 목록:', Object.keys(response.headers));
        throw new Error('No access token received from server');
      }
      
      console.log('✅ 최종 토큰:', accessToken);

      // 5. 사용자 정보 저장
      const userData = response.data.data || response.data;
      console.log('✅ 사용자 데이터 저장:', userData);
      setUser(userData);
      setAccessToken(accessToken);

      // 6. 성공 시 이동
      console.log('✅ 로비로 이동');
      navigate('/lobby');

    } catch (error: any) {
      console.error('Google 로그인 오류:', error);
      
      // axios 에러 처리
      if (error.response?.status === 404) {
        console.log('신규 사용자 - 회원가입 페이지로 이동');
        sessionStorage.setItem('tempGoogleId', userInfo!.id);
        navigate('/signup');
        return;
      }
      
      let errorMessage = '로그인 처리 중 오류가 발생했습니다.';
      if (error instanceof Error) {
        if (error.message.includes('popup_blocked')) {
          errorMessage = '팝업이 차단되었습니다. 팝업을 허용한 후 다시 시도해주세요.';
        } else if (error.message.includes('access_denied')) {
          errorMessage = '로그인이 취소되었습니다.';
        } else if (error.message.includes('No access token received')) {
          errorMessage = '서버에서 인증 토큰을 받지 못했습니다. 잠시 후 다시 시도해주세요.';
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    handleGoogleLogin,
  };
}