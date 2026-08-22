import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
  Menu,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../src/store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // =========================
  // AUTH USER
  // =========================

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // =========================
  // CLOSE DROPDOWNS ON OUTSIDE CLICK
  // =========================

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // MOBILE MENU
  // =========================

  const handleMobileMenu = () => {
    window.dispatchEvent(
      new CustomEvent("hissa:toggle-sidebar")
    );
  };

  // =========================
  // USER INFO
  // =========================

  const userName = user?.name || "User";

  const userEmail =
    user?.email || "No email available";

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  const userInitials = getInitials(userName);

  // =========================
  // PAGE INFORMATION
  // =========================

  const getPageInfo = () => {
    switch (location.pathname) {
      case "/dashboard":
      case "/":
        return {
          title: `Welcome back, ${userName} 👋`,
          subtitle:
            "Here's what's happening with your expenses.",
        };

      case "/groups":
        return {
          title: "Groups",
          subtitle:
            "Manage your groups and shared expenses.",
        };

      case "/expenses":
        return {
          title: "Expenses",
          subtitle:
            "Track and manage all your expenses in one place.",
        };

      case "/settlements":
        return {
          title: "Settlements",
          subtitle:
            "Settle up and keep your balances clear.",
        };

      case "/reports":
        return {
          title: "Reports",
          subtitle:
            "Understand your spending and expense activity.",
        };

      case "/profile":
        return {
          title: "Profile",
          subtitle:
            "Manage your personal information.",
        };

      case "/settings":
        return {
          title: "Settings",
          subtitle:
            "Manage your HISSA preferences.",
        };

      default:
        return {
          title: `Welcome back, ${userName} 👋`,
          subtitle:
            "Here's what's happening with your expenses.",
        };
    }
  };

  const pageInfo = getPageInfo();

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setProfileOpen(false);
    setNotificationOpen(false);

    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* =========================
            LEFT
        ========================= */}

        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={handleMobileMenu}
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg border border-slate-200 text-slate-600
              hover:bg-slate-50 lg:hidden
            "
            aria-label="Open navigation"
          >
            <Menu size={19} />
          </button>

          {/* Page Title */}

          <div className="min-w-0">
            <h1 className="truncate text-[18px] font-bold tracking-tight text-slate-900 sm:text-[20px]">
              {pageInfo.title}
            </h1>

            <p className="mt-0.5 hidden text-[12px] text-slate-500 sm:block">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* =========================
            RIGHT
        ========================= */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* =========================
              NOTIFICATIONS
          ========================= */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setNotificationOpen((value) => !value);
                setProfileOpen(false);
              }}
              className="
                relative flex h-10 w-10 items-center justify-center
                rounded-full text-slate-600 transition
                hover:bg-slate-100 hover:text-slate-900
              "
              aria-label="Notifications"
            >
              <Bell
                size={19}
                strokeWidth={1.8}
              />

              {/* Notification dot */}

              <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {notificationOpen && (
              <div
                className="
                  absolute right-0 top-12 w-[320px] overflow-hidden
                  rounded-xl border border-slate-200 bg-white shadow-xl
                "
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Notifications
                  </h3>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                    2 new
                  </span>
                </div>

                <div className="divide-y divide-slate-100">

                  {/* Notification 1 */}

                  <div className="flex gap-3 px-4 py-3 hover:bg-slate-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Bell size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-800">
                        New expense added
                      </p>

                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Amit added an expense to Weekend Friends.
                      </p>
                    </div>
                  </div>

                  {/* Notification 2 */}

                  <div className="flex gap-3 px-4 py-3 hover:bg-slate-50">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <UserRound size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-800">
                        Group invitation
                      </p>

                      <p className="mt-0.5 text-[11px] text-slate-500">
                        You have a new group invitation.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full border-t border-slate-100 px-4 py-3 text-xs font-semibold text-teal-700 hover:bg-slate-50"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* =========================
              PROFILE
          ========================= */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setProfileOpen((value) => !value);
                setNotificationOpen(false);
              }}
              className="
                flex items-center gap-2.5 rounded-lg px-1.5 py-1.5
                transition hover:bg-slate-50
              "
            >

              {/* Dynamic Avatar */}

              <div
                className="
                  flex h-9 w-9 items-center justify-center rounded-full
                  bg-gradient-to-br from-[#075e59] to-emerald-400
                  text-[11px] font-bold text-white shadow-sm
                "
              >
                {userInitials}
              </div>

              {/* Dynamic Name */}

              <div className="hidden text-left sm:block">
                <p className="max-w-[150px] truncate text-[12px] font-semibold text-slate-800">
                  {userName}
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`hidden text-slate-500 transition-transform sm:block ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}

            {profileOpen && (
              <div
                className="
                  absolute right-0 top-12 w-[240px]
                  overflow-hidden rounded-xl border border-slate-200
                  bg-white shadow-xl
                "
              >

                {/* Profile Header */}

                <div className="border-b border-slate-100 px-4 py-3">
                  <div className="flex items-center gap-3">

                    {/* Avatar */}

                    <div
                      className="
                        flex h-10 w-10 shrink-0 items-center justify-center
                        rounded-full bg-gradient-to-br from-[#075e59] to-emerald-400
                        text-xs font-bold text-white
                      "
                    >
                      {userInitials}
                    </div>

                    {/* User Details */}

                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-900">
                        {userName}
                      </p>

                      <p className="truncate text-[10px] text-slate-500">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}

                <div className="p-1.5">

                  {/* Profile */}

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="
                      flex w-full items-center gap-3 rounded-lg
                      px-3 py-2.5 text-xs font-medium text-slate-700
                      hover:bg-slate-50
                    "
                  >
                    <UserRound size={16} />
                    Profile
                  </button>

                  {/* Settings */}

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="
                      flex w-full items-center gap-3 rounded-lg
                      px-3 py-2.5 text-xs font-medium text-slate-700
                      hover:bg-slate-50
                    "
                  >
                    <Settings size={16} />
                    Settings
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex w-full items-center gap-3 rounded-lg
                      px-3 py-2.5 text-xs font-medium text-red-600
                      hover:bg-red-50
                    "
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;