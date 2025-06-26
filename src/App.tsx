import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import PrivateRoute from "./PrivateRoute";
import LoadingModal from "./components/LoadingModal";

const Dashboard = lazy(() => import("./components/pages/Dashboard"));
const OrgConfiguration = lazy(
  () => import("./components/pages/OrgConfiguration")
);
const MeetConfiguration = lazy(
  () => import("./components/pages/MeetConfiguration")
);
const Trips = lazy(() => import("./components/pages/Trips"));
const UserProfile = lazy(() => import("./components/pages/UserProfile"));
const EditUser = lazy(() => import("./components/pages/EditUser"));
const EditAvatar = lazy(() => import("./forms/EditAvatar"));
const YearCalendar = lazy(() => import("./components/pages/YearCalendar"));
const HomePage = lazy(() => import("./components/pages/HomePage"));
const Login = lazy(() => import("./components/pages/Login"));
const OrgsPage = lazy(() => import("./components/pages/OrgsPage"));
const MeetDetails = lazy(() => import("./components/pages/MeetDetails"));
const OrgDetails = lazy(() => import("./components/pages/OrgDetails"));
const TopBar = lazy(() => import("./components/TopBar"));

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!auth;

  return (
    <div>
      <Suspense fallback={<LoadingModal show />}>
        <Router>
          {isAuthenticated && <TopBar />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Dashboard /> : <HomePage />}
            />
            <Route path="/orgs" element={<OrgsPage />} />
            <Route path="/org/:id" element={<OrgDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/meet/:id" element={<MeetDetails />} />

            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <YearCalendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/org-config"
              element={
                <PrivateRoute>
                  <OrgConfiguration />
                </PrivateRoute>
              }
            />
            <Route
              path="/org-config/:orgId"
              element={
                <PrivateRoute>
                  <OrgConfiguration />
                </PrivateRoute>
              }
            />
            <Route
              path="/meet-config"
              element={
                <PrivateRoute>
                  <MeetConfiguration />
                </PrivateRoute>
              }
            />
            <Route
              path="/meet-config/:meetId"
              element={
                <PrivateRoute>
                  <MeetConfiguration />
                </PrivateRoute>
              }
            />
            <Route
              path="/trips"
              element={
                <PrivateRoute>
                  <Trips />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-avatar"
              element={
                <PrivateRoute>
                  <EditAvatar />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
