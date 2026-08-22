import React from "react";

const Settings = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Settings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-medium text-gray-900">
            Account
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Manage your account preferences.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="font-medium text-gray-900">
            Notifications
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Manage your notification preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
