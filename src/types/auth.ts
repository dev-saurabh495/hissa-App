export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}