import React from "react";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome back!
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Get started by creating your first group.
        </p>
      </div>

      {/* Create First Group */}
      <div className="rounded-xl border border-gray-200 bg-white p-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
            +
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            Create your first group
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Groups help you organize your members and keep everything
            in one place.
          </p>

          <button className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
            Create Group
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h4 className="font-medium text-gray-900">
            Create a group
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Start organizing your members.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h4 className="font-medium text-gray-900">
            Invite members
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Add people to your groups.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h4 className="font-medium text-gray-900">
            Complete profile
          </h4>

          <p className="mt-1 text-sm text-gray-500">
            Update your account information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
