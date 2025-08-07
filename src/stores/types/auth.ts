import type { User } from "@/types/auth";

export interface AuthState {
  user: User | null;
  accessToken: string | null;

  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  clear: () => void;
}
