import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  AtSign,
  Lock,
  ShieldCheck,
  Save,
  Camera,
  CheckCircle2,
} from "lucide-react";

import { useAuthStore } from "../../src/store/authStore";

const Profile: React.FC = () => {
  /*
   * ============================================================
   * AUTH STORE
   * ============================================================
   */

  const authUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);

  /*
   * ============================================================
   * LOCAL FORM STATE
   * ============================================================
   */

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [saved, setSaved] = useState(false);

  /*
   * ============================================================
   * LOAD USER FROM ZUSTAND
   * ============================================================
   */

  useEffect(() => {
    if (!authUser) {
      return;
    }

    setName(authUser.name ?? "");
    setUsername(authUser.username ?? "");
    setEmail(authUser.email ?? "");
    setPhone(authUser.phone ?? "");
  }, [authUser]);

  /*
   * ============================================================
   * INITIALS
   * ============================================================
   */

  const getInitials = (value?: string | null) => {
    if (!value?.trim()) {
      return "U";
    }

    const parts = value.trim().split(/\s+/);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return value.substring(0, 2).toUpperCase();
  };

  /*
   * ============================================================
   * SAVE PROFILE
   * ============================================================
   */

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authUser) {
      console.error("No authenticated user found.");
      return;
    }

    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    /*
     * Keep ALL existing AuthUser properties.
     * Only replace editable profile fields.
     */

    const updatedUser = {
      ...authUser,
      name,
      username,
      email,
      phone,
    };

    /*
     * Update Zustand + auth_user in localStorage
     */

    setAuth(updatedUser, token);

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  /*
   * ============================================================
   * NO USER
   * ============================================================
   */

  if (!authUser) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <User
            size={42}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Profile unavailable
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please login again to view your profile.
          </p>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <div className="mx-auto w-full max-w-5xl">

      {/* PAGE HEADER */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* ========================================================
          PROFILE HERO
      ========================================================= */}

      <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 p-6 text-white shadow-sm">

        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

        <div className="pointer-events-none absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

          {/* AVATAR */}

          <div className="relative">

            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/20 bg-white/20 text-2xl font-bold backdrop-blur-sm">
              {getInitials(authUser.name)}
            </div>

            <button
              type="button"
              className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 bg-white text-emerald-600 shadow-sm transition hover:bg-emerald-50"
              title="Change profile picture"
            >
              <Camera size={14} />
            </button>

          </div>

          {/* USER INFO */}

          <div className="min-w-0">

            <h2 className="truncate text-xl font-bold">
              {authUser.name || "Your Name"}
            </h2>

            <p className="mt-1 text-sm text-emerald-50">
              @{authUser.username || "username"}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-emerald-50">

              <span className="flex items-center gap-1.5">
                <Mail size={13} />
                {authUser.email || "No email"}
              </span>

              {authUser.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone size={13} />
                  {authUser.phone}
                </span>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          MAIN GRID
      ========================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ======================================================
            PERSONAL INFORMATION
        ======================================================= */}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Personal information
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Update your basic account information.
                </p>
              </div>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6"
          >

            <div className="grid gap-5 sm:grid-cols-2">

              {/* NAME */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>
              </div>

              {/* USERNAME */}

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>

                <div className="relative">

                  <AtSign
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="username"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>
              </div>

              {/* PHONE */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone number
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>
              </div>

            </div>

            {/* SAVE */}

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-h-[24px]">

                {saved && (
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <CheckCircle2 size={17} />
                    Profile updated successfully
                  </div>
                )}

              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              >
                <Save size={17} />
                Save changes
              </button>

            </div>

          </form>
        </section>

        {/* ======================================================
            ACCOUNT & SECURITY
        ======================================================= */}

        <aside className="space-y-6">

          {/* ACCOUNT */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Account
                </h3>

                <p className="text-xs text-slate-500">
                  Account information
                </p>
              </div>

            </div>

            <div className="mt-5 space-y-4">

              {/* EMAIL STATUS */}

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Email status
                </span>

                {authUser.email_verified_at ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 size={12} />
                    Verified
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                    Not verified
                  </span>
                )}

              </div>

              {/* ACCOUNT TYPE */}

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Account type
                </span>

                <span className="text-sm font-semibold capitalize text-slate-800">
                  {authUser.role || "Personal"}
                </span>

              </div>

              {/* ACCOUNT STATUS */}

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Status
                </span>

                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-600">
                  {authUser.status || "Active"}
                </span>

              </div>

            </div>

          </section>

          {/* SECURITY */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <Lock size={19} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Security
                </h3>

                <p className="text-xs text-slate-500">
                  Keep your account secure
                </p>
              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Protect your HISSA account with a strong password.
            </p>

            <button
              type="button"
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              Change password
            </button>

          </section>

        </aside>

      </div>
    </div>
  );
};

export default Profile;
 
