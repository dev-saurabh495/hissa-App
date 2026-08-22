import {
  ArrowRight,
  Mail,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useForm,
  Controller,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";

import {
  loginSchema,
  type LoginSchema,
} from "../../lib/validations/auth";

import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  /*
   * Zustand login action
   */
  const loginUser = useAuthStore(
    (state) => state.login
  );

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  /*
   * =========================
   * LOGIN SUBMIT
   * =========================
   */

  const onSubmit = async (
    data: LoginSchema
  ) => {
    try {
      /*
       * Prepare request payload
       */
      const payload = {
        email: data.email
          .trim()
          .toLowerCase(),

        password: data.password,

        remember:
          data.remember ?? false,
      };

      console.log(
        "LOGIN REQUEST:",
        payload
      );

      /*
       * Laravel API request
       */
      const response = await fetch(
          "https://hissaab-backend.onrender.com/api/v1",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      /*
       * Parse JSON response
       */
      const result =
        await response.json();

      console.log(
        "LOGIN RESPONSE:",
        result
      );

      /*
       * =========================
       * VALIDATION / SERVER ERRORS
       * =========================
       *
       * Handles:
       *
       * 422
       * 401
       * 403
       * etc.
       */

      if (!response.ok) {
        /*
         * Laravel field errors
         *
         * Example:
         *
         * {
         *   "errors": {
         *     "email": [
         *       "The provided credentials are incorrect."
         *     ]
         *   }
         * }
         */

        if (result?.errors) {
          Object.entries(
            result.errors
          ).forEach(
            ([field, messages]) => {
              const message =
                Array.isArray(messages)
                  ? messages[0]
                  : String(messages);

              /*
               * Email error
               */
              if (field === "email") {
                setError("email", {
                  type: "server",
                  message,
                });
              }

              /*
               * Password error
               */
              if (field === "password") {
                setError("password", {
                  type: "server",
                  message,
                });
              }
            }
          );
        } else {
          /*
           * If Laravel doesn't return
           * a field-specific error,
           * show it under email.
           */
          setError("email", {
            type: "server",
            message:
              result?.message ||
              "Invalid email or password.",
          });
        }

        return;
      }

      /*
       * =========================
       * SUCCESS RESPONSE
       * =========================
       *
       * Expected Laravel response:
       *
       * {
       *   "message": "Login successful",
       *   "data": {
       *      "user": {},
       *      "token": "..."
       *   }
       * }
       */

      const user =
        result?.data?.user;

      const token =
        result?.data?.token;

      /*
       * Make sure response is valid
       */
      if (!user || !token) {
        console.error(
          "Invalid login response:",
          result
        );

        throw new Error(
          "Invalid response received from server."
        );
      }

      /*
       * =========================
       * SAVE AUTH STATE
       * =========================
       */

      loginUser(
        user,
        token
      );

      /*
       * Store token locally.
       *
       * If authStore already handles
       * persistence, this can later
       * be removed from here.
       */
      localStorage.setItem(
        "auth_token",
        token
      );

      /*
       * =========================
       * SUCCESS
       * =========================
       */

      toast.success(
        result?.message ||
          "Login successful!"
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      /*
       * Network / unexpected errors
       */
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayout
  title="Welcome back"
  subtitle="Login to continue to your Hissaab."
  logoLink="/login"
>
      <form
        className="auth-form"
        onSubmit={handleSubmit(
          onSubmit
        )}
        noValidate
      >
        {/* =========================
            EMAIL
        ========================== */}

        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={
            <Mail size={18} />
          }
          error={
            errors.email?.message
          }
          {...register("email")}
        />

        {/* =========================
            PASSWORD
        ========================== */}

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              name="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={
                errors.password?.message
              }
            />
          )}
        />

        {/* =========================
            REMEMBER ME
        ========================== */}

        <div className="form-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...register("remember")}
            />

            <span>
              Remember me
            </span>
          </label>

          <Link
            to="/forgot-password"
            className="text-link"
          >
            Forgot password?
          </Link>
        </div>

        {/* =========================
            SUBMIT BUTTON
        ========================== */}

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner"
                aria-hidden="true"
              />

              Signing in...
            </>
          ) : (
            <>
              Sign in

              <ArrowRight
                size={18}
              />
            </>
          )}
        </button>
      </form>

      {/* =========================
          SOCIAL LOGIN
      ========================== */}

      <div className="divider">
        <span>OR</span>
      </div>

      <SocialLogin />

      {/* =========================
          REGISTER LINK
      ========================== */}

      <p className="auth-switch">
        Don't have an account?{" "}

        <Link to="/register">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}