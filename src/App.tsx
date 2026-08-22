import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Welcome from "./pages/auth/Welcome";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import GroupDetails from "./pages/GroupDetails";
// import Members from "./pages/";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Route Guards
import GuestRoute from "./components/auth/GuestRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            DEFAULT
        ========================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* =========================
            GUEST ONLY
        ========================== */}

        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        {/* =========================
            PUBLIC AUTH FLOWS
        ========================== */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        {/* =========================
            PROTECTED ROUTES
        ========================== */}

        <Route element={<ProtectedRoute />}>
          {/* Authenticated Welcome */}
          <Route
            path="/welcome"
            element={<Welcome />}
          />

          {/* =========================
              DASHBOARD LAYOUT
          ========================== */}

          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/groups"
              element={<Groups />}
            />

            <Route
              path="/groups/create"
              element={<CreateGroup />}
            />

            <Route
              path="/groups/:id"
              element={<GroupDetails />}
            />

            {/* <Route
              path="/members"
              element={<Members />}
            /> */}

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>
        </Route>


<Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
        {/* =========================
            UNKNOWN URL
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
