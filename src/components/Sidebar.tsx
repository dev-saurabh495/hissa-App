import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UsersRound,
  Receipt,
  ArrowLeftRight,
  BarChart3,
  UserRound,
  Settings,
  LogOut,
  WalletCards,
  X,
  Menu,
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const manageItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Groups",
    path: "/groups",
    icon: UsersRound,
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: Receipt,
  },
  {
    label: "Settlements",
    path: "/settlements",
    icon: ArrowLeftRight,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
];

const accountItems: NavItem[] = [
  {
    label: "Profile",
    path: "/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    // Clear authentication data here if required
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  useEffect(() => {
  const toggleSidebar = () => {
    setMobileOpen((value) => !value);
  };

  window.addEventListener("hissa:toggle-sidebar", toggleSidebar);

  return () => {
    window.removeEventListener("hissa:toggle-sidebar", toggleSidebar);
  };
}, []);

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={closeMobileSidebar}
        className={({ isActive }) =>
          `
          group relative flex items-center gap-3 rounded-lg px-4 py-2.5
          text-[13px] font-medium transition-all duration-200
          ${
            isActive
              ? "bg-gradient-to-r from-teal-500/90 to-emerald-400/75 text-white shadow-sm"
              : "text-white/80 hover:bg-white/10 hover:text-white"
          }
          `
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={18}
              strokeWidth={isActive ? 2.2 : 1.8}
              className="shrink-0"
            />

            <span>{item.label}</span>

            {isActive && (
              <span className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="
          fixed left-4 top-4 z-40 flex h-10 w-10 items-center
          justify-center rounded-lg bg-[#075e59] text-white
          shadow-lg lg:hidden
        "
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[255px] flex-col
          bg-gradient-to-b from-[#075e59] via-[#075b56] to-[#064d49]
          text-white shadow-xl transition-transform duration-300
          lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 lg:shadow-none
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-between px-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="
              flex h-9 w-9 items-center justify-center rounded-lg
              border border-white/20 bg-white/10
            ">
              <WalletCards size={20} strokeWidth={1.8} />
            </div>

            <span className="text-[17px] font-bold tracking-tight">
              HISSA
            </span>
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pb-5">
          {/* Manage */}
          <div className="mb-7">
            <p className="mb-2 px-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Manage
            </p>

            <nav className="space-y-1">
              {manageItems.map(renderNavItem)}
            </nav>
          </div>

          {/* Account */}
          <div>
            <p className="mb-2 px-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Account
            </p>

            <nav className="space-y-1">
              {accountItems.map(renderNavItem)}
            </nav>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 px-4 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3 rounded-lg px-4 py-2.5
              text-[13px] font-medium text-white/80
              transition hover:bg-white/10 hover:text-white
            "
          >
            <LogOut size={18} strokeWidth={1.8} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;