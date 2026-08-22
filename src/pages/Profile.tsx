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

interface UserData {
  id?: number | string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const [saved, setSaved] = useState(false);

  /*
   * ----------------------------------------------------
   * LOAD USER
   * ----------------------------------------------------
   */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          id: parsedUser.id,
          name: parsedUser.name || "",
          username: parsedUser.username || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });
      } catch {
        console.error("Unable to load user profile.");
      }
    }
  }, []);

  /*
   * ----------------------------------------------------
   * HANDLE INPUT
   * ----------------------------------------------------
   */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  /*
   * ----------------------------------------------------
   * SAVE PROFILE
   * ----------------------------------------------------
   */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(user));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  /*
   * ----------------------------------------------------
   * USER INITIALS
   * ----------------------------------------------------
   */

  const getInitials = (name?: string) => {
    if (!name) return "U";

    const parts = name.trim().split(" ");

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* =====================================================
          PROFILE HERO
      ====================================================== */}

      <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 p-6 text-white shadow-sm">
        {/* Decorative circles */}

        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

        <div className="pointer-events-none absolute -bottom-16 right-24 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}

          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white/20 bg-white/20 text-2xl font-bold backdrop-blur-sm">
              {getInitials(user.name)}
            </div>

            <button
              type="button"
              className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 bg-white text-emerald-600 shadow-sm transition hover:bg-emerald-50"
              title="Change profile picture"
            >
              <Camera size={14} />
            </button>
          </div>

          {/* User information */}

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold">
              {user.name || "Your Name"}
            </h2>

            <p className="mt-1 text-sm text-emerald-50">
              @{user.username || "username"}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-emerald-50">
              <span className="flex items-center gap-1.5">
                <Mail size={13} />
                {user.email || "email@example.com"}
              </span>

              {user.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone size={13} />
                  {user.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* =====================================================
            PROFILE INFORMATION
        ====================================================== */}

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

          <form onSubmit={handleSubmit} className="p-6">
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
                    name="name"
                    type="text"
                    value={user.name || ""}
                    onChange={handleChange}
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
                    name="username"
                    type="text"
                    value={user.username || ""}
                    onChange={handleChange}
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
                    name="email"
                    type="email"
                    value={user.email || ""}
                    onChange={handleChange}
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
                    name="phone"
                    type="tel"
                    value={user.phone || ""}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>
            </div>

            {/* SAVE */}

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
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

        {/* =====================================================
            ACCOUNT & SECURITY
        ====================================================== */}

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
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Email status
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Account type
                </span>

                <span className="text-sm font-semibold text-slate-800">
                  Personal
                </span>
              </div>
            </div>
          </section>

          {/* PASSWORD */}

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