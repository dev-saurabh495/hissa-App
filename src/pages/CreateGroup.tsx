import React from "react";
import { Link } from "react-router-dom";

const CreateGroup = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <Link
          to="/groups"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← Back to Groups
        </Link>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Create Group
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new group for your members.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Group name
            </label>

            <input
              type="text"
              placeholder="Enter group name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter group description"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Link
              to="/groups"
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
