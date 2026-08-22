import api from "../lib/api-client";

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

export interface AuthUser {
  id: number;
  uuid: string;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  avatar: string | null;
  bio: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
}

export const authService = {
  async register(
    data: RegisterRequest
  ): Promise<RegisterResponse> {
    return await api.post<RegisterResponse>(
      "/auth/register",
      data
    );
  },
};      