import {
  ArrowRight,
  ArrowLeft,
  MailCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import AuthLayout from "../../components/auth/AuthLayout";
import OTPInput from "../../components/auth/OTPInput";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(30);

  const email =
    sessionStorage.getItem("hissa-reset-email") ??
    "your email";

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    toast.success("Code verified!");

    navigate("/reset-password");
  };

  const resendOTP = () => {
    setSeconds(30);
    toast.success("A new verification code has been sent.");
  };

  return (
    <AuthLayout
      title="Check your inbox"
      subtitle="We've sent a 6-digit verification code to your email."
    >
      <div className="verification-icon">
        <MailCheck size={28} />
      </div>

      <div className="otp-description">
        <p>
          Enter the code sent to
          <strong>{email}</strong>
        </p>
      </div>

      <OTPInput value={otp} onChange={setOtp} />

      <button
        type="button"
        className="primary-button"
        onClick={handleVerify}
      >
        Verify code
        <ArrowRight size={18} />
      </button>

      <div className="resend-row">
        <span>Didn't receive the code?</span>

        {seconds > 0 ? (
          <span className="resend-disabled">
            Resend in {seconds}s
          </span>
        ) : (
          <button
            type="button"
            className="text-button"
            onClick={resendOTP}
          >
            Resend code
          </button>
        )}
      </div>

      <Link to="/forgot-password" className="back-link">
        <ArrowLeft size={17} />
        Change email
      </Link>
    </AuthLayout>
  );
}