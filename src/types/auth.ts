export interface User { // = LoginResponse
    userId: number;
    socialId: string;
    provider: 'GOOGLE';
    nickname: string;
    createdAt: string;
    totalGames: number;
    wins: number;
    deleted: boolean;
    role: 'USER' | 'ADMIN';
  }
  
  export interface LoginRequest {
    provider: 'google';
    socialId: string;
  }
  
  export interface LoginResponse {
    userId: number;
    socialId: string;
    provider: 'GOOGLE';
    nickname: string;
    createdAt: string;
    totalGames: number;
    wins: number;
    deleted: boolean;
    role: 'USER' | 'ADMIN';
  }


// Google OAuth 관련 타입 정의
export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface GoogleTokenResponse {
  access_token: string;
  error?: string;
  error_description?: string;
}

export interface GoogleTokenClient {
  requestAccessToken: () => void;
}

// 구글 API 전역 타입 확장
declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleTokenResponse) => void;
          }) => GoogleTokenClient;
        };
      };
    };
  }
}