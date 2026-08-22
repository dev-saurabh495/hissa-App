import React from "react";
import { Link } from "react-router-dom";

const Groups = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Groups
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your groups.
          </p>
        </div>

        <Link
          to="/groups/create"
          className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Create Group
        </Link>
      </div>

      {/* Empty State */}
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
          +
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          No groups yet
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Create your first group to get started.
        </p>

        <Link
          to="/groups/create"
          className="mt-5 inline-block rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Create Group
        </Link>
      </div>
    </div>
  );
};

export default Groups;
