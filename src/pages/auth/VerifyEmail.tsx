import {
  ArrowRight,
  MailCheck,
  RefreshCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import { useAuthStore } from "../../store/authStore";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const updateUser = useAuthStore(
    (state) => state.updateUser
  );

  const handleResend = () => {
    toast.success("Verification email sent again!");
  };

  const handleContinue = () => {
    if (!user) {
      toast.error("User information not found.");
      return;
    }

    updateUser({
      ...user,
      email_verified_at: new Date().toISOString(),
    });

    navigate("/welcome");
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="One quick step before you start using HISSA."
    >
      <div className="verification-page">
        <div className="verification-icon large">
          <MailCheck size={34} />
        </div>

        <h3>Check your email</h3>

        <p>
          We've sent a verification link to{" "}
          <strong>
            {user?.email ?? "your email address"}
          </strong>
          .
        </p>

        <div className="verification-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={handleResend}
          >
            <RefreshCcw size={17} />
            Resend email
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={handleContinue}
          >
            I've verified my email
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}