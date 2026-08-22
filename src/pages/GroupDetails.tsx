import React from "react";
import { Link } from "react-router-dom";

const GroupDetails = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Link
        to="/groups"
        className="text-sm text-gray-500 hover:text-gray-900"
      >
        ← Back to Groups
      </Link>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold text-gray-900">
          Group Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your group and members.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">
          Group Name
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Your group description will appear here.
        </p>
      </div>
    </div>
  );
};

export default GroupDetails;
