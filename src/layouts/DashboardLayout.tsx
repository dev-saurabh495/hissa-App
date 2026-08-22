import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#f7f9f8] text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Application */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;