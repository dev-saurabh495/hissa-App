import { LogOut, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    toast.success("You have been logged out.");

    navigate("/login");
  };

  return (
    <main className="dashboard-placeholder">
      <div className="dashboard-card">
        <div className="dashboard-logo">
          <WalletCards size={25} />
        </div>

        <span className="dashboard-label">
          AUTHENTICATION COMPLETE
        </span>

        <h1>
          Welcome to <span>HISSA</span>
        </h1>

        <p>
          Hi {user?.name ?? "there"}, your authentication
          foundation is working correctly.
        </p>

        <button
          type="button"
          className="secondary-button"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </main>
  );
}