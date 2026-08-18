import {
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";
import { loginSchema } from "../../lib/validations/auth";
import type { LoginSchema } from "../../lib/validations/auth";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });
  const passwordField = register("password");

  const password = watch("password");

  const onSubmit = async (data: LoginSchema) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    login({
      id: "demo-user",
      name: "Saurabh",
      email: data.email,
      emailVerified: true,
    });

    toast.success("Welcome back to HISSA!");

    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue managing your shared expenses."
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail size={18} />}
          error={errors.email?.message}
          {...register("email")}
        />
        
<PasswordInput
  name="password"
  value={password}
  onChange={passwordField.onChange}
  onBlur={passwordField.onBlur}
  error={errors.password?.message}
/>


        <div className="form-row">
          <label className="checkbox-label">
            <input type="checkbox" {...register("remember")} />
            <span>Remember me</span>
          </label>

          <Link to="/forgot-password" className="text-link">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <SocialLogin />

      <p className="auth-switch">
        Don't have an account?{" "}
        <Link to="/register">Create account</Link>
      </p>
    </AuthLayout>
  );
}