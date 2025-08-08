import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import { ApiError, type ApiSuccessResponse } from "@/types/api/response";
import { useAuthStore } from "@/stores/authStore";

/**
 * API 클라이언트 클래스
 *
 * 애플리케이션의 모든 HTTP 요청을 처리하는 중앙화된 API 클라이언트입니다.
 * Axios를 기반으로 하며 인증, 에러 처리, 응답 변환을 자동으로 처리합니다.
 */
class ApiClient {
  private instance: AxiosInstance;

  /**
   * API 클라이언트 생성자
   *
   * @param baseURL - API의 기본 URL (기본값: 환경변수 또는 localhost)
   */
  constructor(baseURL = import.meta.env.VITE_API_BASE_URL) {
    const finalBaseURL = baseURL || "http://localhost:8080";

    this.instance = axios.create({
      baseURL: `${finalBaseURL}`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // 쿠키 포함
    });

    this.setupInterceptors();
  }

  /**
   * Axios 인터셉터 설정
   */
  private setupInterceptors() {
    // Request interceptor - 토큰 자동 추가
    this.instance.interceptors.request.use(
      (config) => {
        try {
          let accessToken = null;
          try {
            const state = useAuthStore.getState();
            accessToken = state.accessToken;
          } catch (storeError) {
            console.warn(
              "Failed to get token from store, trying localStorage:",
              storeError
            );
            // fallback: localStorage에서 직접 가져오기
            const authStorage = localStorage.getItem("auth-storage");
            if (authStorage) {
              const parsed = JSON.parse(authStorage);
              accessToken = parsed.state?.accessToken;
            }
          }

          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          console.error("Error getting access token:", error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - 에러 변환
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiSuccessResponse<unknown>>) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.isAxiosError) {
          throw new ApiError(error);
        }
        throw error;
      }
    );
  }

  /**
   * GET 요청 수행
   */
  async get<T>(url: string, params?: object): Promise<T> {
    const response = await this.instance.get(url, {
      params,
    });
    return response.data.data ?? response.data;
  }

  /**
   * POST 요청 수행
   */
  async post<T>(url: string, data?: object): Promise<T> {
    const response = await this.instance.post<ApiSuccessResponse<T>>(url, data);
    return response.data.data;
  }

  /**
   * PUT 요청 수행
   */
  async put<T>(url: string, data?: object): Promise<T> {
    const response = await this.instance.put<ApiSuccessResponse<T>>(url, data);
    return response.data.data;
  }

  /**
   * DELETE 요청 수행
   */
  async delete<T>(url: string): Promise<T> {
    const response = await this.instance.delete<ApiSuccessResponse<T>>(url);
    return response.data.data;
  }

  
}

/**
 * 전역 API 클라이언트 인스턴스
 */
export const apiClient = new ApiClient();
