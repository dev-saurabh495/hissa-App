import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordInput from "../../components/auth/PasswordInput";
import PasswordStrength from "../../components/auth/PasswordStrength";

import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../../lib/validations/auth";

export default function ResetPassword() {
  const navigate = useNavigate();

  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password");
  const passwordField = register("password");
  const confirmPasswordField =
  register("confirmPassword");

  const onSubmit = async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    sessionStorage.removeItem("hissa-reset-email");

    toast.success("Password updated successfully!");

    navigate("/login");
  };

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Choose a strong password you haven't used before."
    >
      <div className="security-note">
        <CheckCircle2 size={18} />
        <span>
          Your account security is important to us.
        </span>
      </div>

      <form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PasswordInput
  name="password"
  value={password}
  onChange={passwordField.onChange}
  onBlur={passwordField.onBlur}
  error={errors.password?.message}
/>

        <PasswordStrength password={password} />

       <PasswordInput
  name="confirmPassword"
  value={"confirmPassword"}
  onChange={confirmPasswordField.onChange}
  onBlur={confirmPasswordField.onBlur}
  error={errors.confirmPassword?.message}
  label="Confirm password"
/>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" />
              Updating password...
            </>
          ) : (
            <>
              Update password
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}