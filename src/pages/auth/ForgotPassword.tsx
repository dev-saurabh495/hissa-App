import {
  ArrowLeft,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";

import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../../lib/validations/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    sessionStorage.setItem(
      "hissa-reset-email",
      data.email
    );

    toast.success("Verification code sent!");

    navigate("/verify-otp");
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a verification code."
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

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" />
              Sending code...
            </>
          ) : (
            <>
              Send verification code
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <Link to="/login" className="back-link">
        <ArrowLeft size={17} />
        Back to sign in
      </Link>
    </AuthLayout>
  );
}