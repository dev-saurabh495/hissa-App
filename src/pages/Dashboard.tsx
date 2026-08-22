import {
  Bell,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Home,
  LogOut,
  Plus,
  Receipt,
  Settings,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
  ArrowDownToLine,
  ArrowUpFromLine,
  Utensils,
  Plane,
  House,
  Clapperboard,
  MoreHorizontal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth_token");

    toast.success("You have been logged out.");
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <ShieldIcon />
          </div>

          <p className="mb-2 text-xs font-bold tracking-widest text-teal-700">
            AUTHENTICATION REQUIRED
          </p>

          <h1 className="text-2xl font-bold text-slate-900">
            Please sign in
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            No authenticated user was found. Please login to continue.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 w-full rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  const expenses = [
    {
      title: "Dinner at Cafe Delhi Heights",
      category: "Food & Dining",
      icon: Utensils,
      amount: "₹1,850.00",
      paidBy: "You",
      date: "Today",
      group: "Weekend Friends",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Trip to Manali",
      category: "Travel",
      icon: Plane,
      amount: "₹8,450.00",
      paidBy: "Amit Sharma",
      date: "Yesterday",
      group: "Manali Trip",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "House Rent - May",
      category: "Home",
      icon: House,
      amount: "₹12,000.00",
      paidBy: "You",
      date: "2 days ago",
      group: "Flatmates",
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Movie Night",
      category: "Entertainment",
      icon: Clapperboard,
      amount: "₹680.00",
      paidBy: "Rahul Verma",
      date: "3 days ago",
      group: "College Friends",
      color: "bg-pink-50 text-pink-700",
    },
    {
      title: "Grocery Shopping",
      category: "Groceries",
      icon: ShoppingBag,
      amount: "₹1,230.00",
      paidBy: "Priya Singh",
      date: "3 days ago",
      group: "Family",
      color: "bg-lime-50 text-lime-700",
    },
  ];

  const balances = [
    {
      name: "Amit Sharma",
      amount: "₹1,850.00",
      type: "owe",
      avatar: "AS",
      color: "bg-teal-100 text-teal-700",
    },
    {
      name: "Rahul Verma",
      amount: "₹600.00",
      type: "owe",
      avatar: "RV",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Priya Singh",
      amount: "₹950.00",
      type: "you",
      avatar: "PS",
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Neha Gupta",
      amount: "₹1,750.00",
      type: "you",
      avatar: "NG",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const navigation = [
    {
      label: "Dashboard",
      icon: Home,
      active: true,
      path: "/dashboard",
    },
    {
      label: "Groups",
      icon: Users,
      path: "/groups",
    },
    {
      label: "Expenses",
      icon: Receipt,
      path: "/expenses",
    },
    {
      label: "Settlements",
      icon: ArrowDownToLine,
      path: "/settlements",
    },
    {
      label: "Reports",
      icon: FileText,
      path: "/reports",
    },
  ];

  const accountNavigation = [
    {
      label: "Profile",
      icon: UserRound,
      path: "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fa] text-slate-800">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col bg-[#075e59] text-white lg:flex">
        {/* Logo */}
        <div className="flex h-[72px] items-center gap-3 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <WalletCards size={19} />
          </div>

          <span className="text-lg font-bold tracking-wide">HISSA</span>
        </div>

        {/* Main Navigation */}
        <div className="px-3">
          <p className="px-3 pb-2 pt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
            Manage
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition ${
                    item.active
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Account */}
        <div className="mt-5 px-3">
          <p className="px-3 pb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
            Account
          </p>

          <nav className="space-y-1">
            {accountNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-auto border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE TOP BAR
      ====================================================== */}
      <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#075e59] text-white">
            <WalletCards size={18} />
          </div>

          <span className="font-bold text-slate-800">HISSA</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="min-h-screen lg:ml-[220px]">
        {/* Top Header */}
        <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div>
            <h1 className="text-[17px] font-bold text-slate-900">
              Welcome back, {user.name?.split(" ")[0] || "there"} 👋
            </h1>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Here's what's happening with your expenses.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
            >
              <Bell size={17} />

              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#e5eee9] text-[10px] font-bold text-[#075e59]">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user.name)
                )}
              </div>

              <div className="hidden text-left md:block">
                <p className="text-[11px] font-semibold text-slate-800">
                  {user.name}
                </p>

                <p className="text-[9px] text-slate-400">
                  {user.role || "Member"}
                </p>
              </div>

              <ChevronDown size={13} className="text-slate-400" />
            </div>
          </div>
        </header>

        
      </main>
    </div>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function StatCard({
  title,
  amount,
  subtitle,
  icon: Icon,
  iconClass,
}: {
  title: string;
  amount: string;
  subtitle: string;
  icon: React.ElementType;
  iconClass: string;
  iconBg?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[9px] font-medium text-slate-400">{title}</p>

          <h3 className="mt-2 text-[17px] font-bold tracking-tight text-slate-800">
            {amount}
          </h3>

          <p className="mt-1 text-[8px] text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${iconClass}`}
        >
          <Icon size={15} />
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-left transition hover:border-[#b9d8d3] hover:bg-[#f4faf9]"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf8f6] text-[#08736b]">
        <Icon size={14} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-700 group-hover:text-[#08736b]">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[8px] text-slate-400">
          {subtitle}
        </p>
      </div>
    </button>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  positive = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#edf8f6] text-[#08736b]">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-[9px] text-slate-400">{label}</p>

        <p
          className={`mt-1 text-[14px] font-bold ${
            positive ? "text-emerald-600" : "text-slate-800"
          }`}
        >
          {value}
        </p>

        <p className="mt-0.5 text-[8px] text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function getInitials(name?: string | null) {
  if (!name) return "U";

  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ShieldIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 4.5 6v5.5c0 4.8 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.7 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}
