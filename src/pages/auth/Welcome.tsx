import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import AuthLayout from "../../components/auth/AuthLayout";
export default function Welcome() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  return (
    <AuthLayout
      title={`Welcome, ${user?.name?.split(" ")[0] ?? "there"}!`}
      subtitle="Your HISSA account is ready."
    >
      <div className="welcome-page">
        <div className="welcome-icon">
          <Sparkles size={34} />
        </div>

        <h3>Let's make expenses simpler.</h3>

        <p>
          HISSA helps you split expenses fairly, understand
          who paid what and settle everything without
          unnecessary calculations.
        </p>

        <div className="welcome-points">
          <div>
            <CheckCircle2 size={18} />
            <span>Create shared groups</span>
          </div>

          <div>
            <CheckCircle2 size={18} />
            <span>Track everyone's expenses</span>
          </div>

          <div>
            <CheckCircle2 size={18} />
            <span>Settle balances easily</span>
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/dashboard")}
        >
          Continue to HISSA
          <ArrowRight size={18} />
        </button>
      </div>
    </AuthLayout>
  );
}