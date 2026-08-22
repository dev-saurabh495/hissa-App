import { create } from "zustand";
import type { AuthUser } from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (
    user: AuthUser,
    token: string
  ) => void;

  logout: () => void;

  setAuth: (
    user: AuthUser,
    token: string
  ) => void;

  clearAuth: () => void;

  register: (
    user: AuthUser,
    token: string
  ) => void;

  updateUser: (
    user: AuthUser
  ) => void;
}

const storedToken =
  localStorage.getItem("auth_token");

const storedUser =
  localStorage.getItem("auth_user");

let parsedUser: AuthUser | null = null;

try {
  parsedUser = storedUser
    ? JSON.parse(storedUser)
    : null;
} catch {
  parsedUser = null;
}

export const useAuthStore =
  create<AuthState>((set) => ({

    /**
     * =========================
     * INITIAL STATE
     * =========================
     */

    user: parsedUser,

    token: storedToken,

    isAuthenticated:
      Boolean(
        storedToken &&
        parsedUser
      ),

    /**
     * =========================
     * LOGIN
     * =========================
     */

    login: (
      user,
      token
    ) => {

      localStorage.setItem(
        "auth_token",
        token
      );

      localStorage.setItem(
        "auth_user",
        JSON.stringify(user)
      );

      set({
        user,
        token,
        isAuthenticated: true,
      });
    },

    /**
     * =========================
     * REGISTER
     * =========================
     */

    register: (
      user,
      token
    ) => {

      localStorage.setItem(
        "auth_token",
        token
      );

      localStorage.setItem(
        "auth_user",
        JSON.stringify(user)
      );

      set({
        user,
        token,
        isAuthenticated: true,
      });
    },

    /**
     * =========================
     * SET AUTH
     * =========================
     */

    setAuth: (
      user,
      token
    ) => {

      localStorage.setItem(
        "auth_token",
        token
      );

      localStorage.setItem(
        "auth_user",
        JSON.stringify(user)
      );

      set({
        user,
        token,
        isAuthenticated: true,
      });
    },

    /**
     * =========================
     * UPDATE USER
     * =========================
     */

    updateUser: (
      user
    ) => {

      localStorage.setItem(
        "auth_user",
        JSON.stringify(user)
      );

      set({
        user,
      });
    },

    /**
     * =========================
     * LOGOUT
     * =========================
     */

    logout: () => {

      localStorage.removeItem(
        "auth_token"
      );

      localStorage.removeItem(
        "auth_user"
      );

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },

    /**
     * =========================
     * CLEAR AUTH
     * =========================
     */

    clearAuth: () => {

      localStorage.removeItem(
        "auth_token"
      );

      localStorage.removeItem(
        "auth_user"
      );

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },

  }));