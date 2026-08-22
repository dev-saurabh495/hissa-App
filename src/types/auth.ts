export interface AuthUser {
  id: number;
  uuid: string;
  name: string;
  username: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  bio: string | null;
  role: string;
  status: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  last_login_at: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  message: string;

  data: {
    user: AuthUser;
    token: string;
  };
}

export interface MeResponse {
  data: {
    user: AuthUser;
  };
}