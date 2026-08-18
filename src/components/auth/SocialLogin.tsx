import { Globe2 } from "lucide-react";
import { toast } from "sonner";

export default function SocialLogin() {
  const handleGoogleLogin = () => {
    toast.info("Google authentication will be connected later.");
  };

  return (
    <button
      type="button"
      className="google-button"
      onClick={handleGoogleLogin}
    >
      <Globe2 size={19} />
      <span>Continue with Google</span>
    </button>
  );
}