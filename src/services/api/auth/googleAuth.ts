import type { GoogleUserInfo, GoogleTokenResponse, GoogleTokenClient } from "@/types/auth";

/**
 * Google OAuth2 서비스가 로드되었는지 확인
 */
export function isGoogleLoaded(): boolean {
  return !!window.google?.accounts?.oauth2;
}

/**
 * Google 사용자 정보 가져오기
 */
export async function fetchUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Google OAuth2 팝업 로그인 실행
 */
export async function googleLoginWithPopup(clientId: string): Promise<GoogleUserInfo> {
  return new Promise((resolve, reject) => {
    if (!isGoogleLoaded()) {
      reject(new Error('Google OAuth2 service is not loaded'));
      return;
    }

    const tokenClient: GoogleTokenClient = window.google!.accounts!.oauth2!.initTokenClient({
      client_id: clientId,
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

          const userInfo = await fetchUserInfo(response.access_token);
          resolve(userInfo);
        } catch (error) {
          reject(error);
        }
      },
    });

    tokenClient.requestAccessToken();
  });
}