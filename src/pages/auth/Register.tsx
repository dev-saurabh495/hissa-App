import {
  ArrowRight,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import PasswordStrength from "../../components/auth/PasswordStrength";
import SocialLogin from "../../components/auth/SocialLogin";

import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/validations/auth";

import { useAuthStore } from "../../store/authStore";

export default function Register() {
  const navigate = useNavigate();
  const registerUser = useAuthStore(
    (state) => state.register
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");
const passwordField = register("password");
  const onSubmit = async (data: RegisterSchema) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    registerUser({
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      emailVerified: false,
    });

    toast.success("Account created successfully!");

    navigate("/verify-email");
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start keeping your shared expenses simple and transparent."
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="two-column">
          <AuthInput
            id="name"
            label="Full name"
            type="text"
            placeholder="Saurabh Pandey"
            autoComplete="name"
            icon={<UserRound size={18} />}
            error={errors.name?.message}
            {...register("name")}
          />

          <AuthInput
            id="phone"
            label="Phone number"
            type="tel"
            placeholder="9876543210"
            autoComplete="tel"
            icon={<Phone size={18} />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

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

        <PasswordStrength password={password} />

       <PasswordInput
  name="password"
  value={password}
  onChange={passwordField.onChange}
  onBlur={passwordField.onBlur}
  error={errors.password?.message}
/>

        <label className="checkbox-label terms-checkbox">
          <input
            type="checkbox"
            {...register("terms")}
          />

          <span>
            I agree to the{" "}
            <button type="button" className="inline-link">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="inline-link">
              Privacy Policy
            </button>
          </span>
        </label>

        {errors.terms && (
          <p className="field-error">
            {errors.terms.message}
          </p>
        )}

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" />
              Creating account...
            </>
          ) : (
            <>
              Create account
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
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}