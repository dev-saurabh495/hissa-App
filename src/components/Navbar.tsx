import React from "react";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button className="rounded-md p-2 text-gray-600 hover:bg-gray-100">
            ☰
          </button>

          <h1 className="text-lg font-semibold text-gray-900">
            Dashboard
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="rounded-md p-2 text-gray-600 hover:bg-gray-100">
            🔔
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700">
              U
            </div>

            <span className="text-sm font-medium text-gray-700">
              User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
