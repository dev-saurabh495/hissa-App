import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Users,
  Receipt,
  Wallet,
  UserPlus,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Clock3,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id?: number | string;
  name?: string;
  username?: string;
  email?: string;
}

interface Group {
  id: number | string;
  name: string;
  members?: number;
  balance?: number;
}

interface Expense {
  id: number | string;
  title: string;
  group?: string;
  amount: number;
  date?: string;
  paidBy?: string;
}

const Dashboard: React.FC = () => {
  /*
   * ----------------------------------------------------
   * AUTH USER
   * ----------------------------------------------------
   *
   * Ideally ye data tumhare Zustand/Auth context se aayega.
   * Abhi localStorage fallback rakha hai taaki dashboard
   * directly bhi work kare.
   */

  const storedUser = localStorage.getItem("user");

  let user: User | null = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const userName =
    user?.name ||
    user?.username ||
    localStorage.getItem("user_name") ||
    "there";

  const firstName = userName.split(" ")[0];

  /*
   * ----------------------------------------------------
   * TEMP DATA
   * ----------------------------------------------------
   *
   * Jab backend connect ho jayega, in arrays ko API/
   * TanStack Query/Zustand data se replace kar dena.
   */

  const groups: Group[] = [];

  const recentExpenses: Expense[] = [];

  const hasGroups = groups.length > 0;
  const hasExpenses = recentExpenses.length > 0;

  const totalBalance = groups.reduce(
    (total, group) => total + (group.balance || 0),
    0
  );

  const totalExpenses = recentExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  /*
   * ----------------------------------------------------
   * DASHBOARD
   * ----------------------------------------------------
   */

  return (
    <div className="min-h-full bg-slate-50">
      <div className="space-y-6">
        {/* =====================================================
            WELCOME HEADER
        ====================================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 p-6 text-white shadow-sm sm:p-8">
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-20 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Sparkles size={14} />
              Your personal hisaab space
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {firstName}! 👋
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50 sm:text-base">
              Keep your group expenses organized, split bills easily, and
              always know who owes whom.
            </p>

            {!hasGroups && !hasExpenses && (
              <div className="mt-6">
                <Link
                  to="/groups/create"
                  className="inline-flex items-center gap-2 rounded-xl bg-gray px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
                >
                  <Plus size={18} />
                  Create your first group
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            FIRST TIME USER
        ====================================================== */}

        {!hasGroups && !hasExpenses && (
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Let's get your hisaab started
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose what you want to do first.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* CREATE GROUP */}

              <Link
                to="/groups/create"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Users size={22} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition group-hover:text-emerald-500"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Create a group
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Start a group for friends, trips, roommates, family or any
                  shared expenses.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  Create group
                  <ArrowRight size={15} />
                </div>
              </Link>

              {/* JOIN GROUP */}

              <Link
                to="/groups/join"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <UserPlus size={22} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition group-hover:text-blue-500"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Join a group
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Already have an invite? Join your friend's group and start
                  tracking expenses together.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Join group
                  <ArrowRight size={15} />
                </div>
              </Link>

              {/* ADD EXPENSE */}

              <Link
                to="/expenses/create"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Receipt size={22} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition group-hover:text-orange-500"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  Add an expense
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Already have something to record? Add an expense and keep
                  your hisaab up to date.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-orange-600">
                  Add expense
                  <ArrowRight size={15} />
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* =====================================================
            REAL DASHBOARD
            Shows when user has data
        ====================================================== */}

        {(hasGroups || hasExpenses) && (
          <>
            {/* SUMMARY CARDS */}

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Balance */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Wallet size={20} />
                  </div>

                  <TrendingUp size={17} className="text-emerald-500" />
                </div>

                <p className="mt-4 text-sm text-slate-500">Your balance</p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  ₹{Math.abs(totalBalance).toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Across all groups
                </p>
              </div>

              {/* Expenses */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <IndianRupee size={20} />
                  </div>

                  <Receipt size={17} className="text-blue-500" />
                </div>

                <p className="mt-4 text-sm text-slate-500">Total expenses</p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  ₹{totalExpenses.toLocaleString("en-IN")}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Recorded expenses
                </p>
              </div>

              {/* Groups */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Users size={20} />
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-500">Your groups</p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {groups.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Active groups
                </p>
              </div>

              {/* Activity */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Clock3 size={20} />
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Recent activity
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {recentExpenses.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Recent transactions
                </p>
              </div>
            </section>

            {/* GROUPS + RECENT EXPENSES */}

            <div className="grid gap-6 lg:grid-cols-3">
              {/* GROUPS */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-1">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <h2 className="font-bold text-slate-900">Your groups</h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Manage shared expenses
                    </p>
                  </div>

                  <Link
                    to="/groups"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {groups.length > 0 ? (
                    groups.slice(0, 5).map((group) => (
                      <Link
                        key={group.id}
                        to={`/groups/${group.id}`}
                        className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-semibold text-emerald-600">
                          {group.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {group.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {group.members || 0} members
                          </p>
                        </div>

                        <ArrowRight
                          size={16}
                          className="text-slate-300"
                        />
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-center">
                      <Users
                        size={30}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-medium text-slate-700">
                        No groups yet
                      </p>

                      <Link
                        to="/groups/create"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600"
                      >
                        Create one
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              {/* RECENT EXPENSES */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Recent expenses
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Your latest transactions
                    </p>
                  </div>

                  <Link
                    to="/expenses"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    View all
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {recentExpenses.length > 0 ? (
                    recentExpenses.slice(0, 6).map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          <Receipt size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {expense.title}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {expense.group || "Personal expense"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900">
                            ₹{expense.amount.toLocaleString("en-IN")}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {expense.date || "Recently"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-12 text-center">
                      <Receipt
                        size={34}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-medium text-slate-700">
                        No expenses yet
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Start recording your expenses to see them here.
                      </p>

                      <Link
                        to="/expenses/create"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                      >
                        <Plus size={14} />
                        Add expense
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* QUICK ACTIONS */}

            <section>
              <div className="mb-4">
                <h2 className="font-bold text-slate-900">Quick actions</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Common things you can do
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <Link
                  to="/groups/create"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Plus size={18} />
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    Create group
                  </span>
                </Link>

                <Link
                  to="/expenses/create"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Receipt size={18} />
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    Add expense
                  </span>
                </Link>

                <Link
                  to="/settlements"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-orange-200 hover:shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <Wallet size={18} />
                  </div>

                  <span className="text-sm font-semibold text-slate-800">
                    Settle up
                  </span>
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;