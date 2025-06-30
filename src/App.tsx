import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import PrivateRoute from "./PrivateRoute";
import LoadingModal from "./components/LoadingModal";
import { routes } from "./constants/routes";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const OrgConfiguration = lazy(() => import("./pages/OrgConfiguration"));
const MeetConfiguration = lazy(() => import("./pages/MeetConfiguration"));
const Trips = lazy(() => import("./pages/Trips"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const EditUser = lazy(() => import("./pages/EditUser"));
const EditAvatar = lazy(() => import("./forms/EditAvatar"));
const YearCalendar = lazy(() => import("./pages/YearCalendar"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const OrgsPage = lazy(() => import("./pages/OrgsPage"));
const MeetDetails = lazy(() => import("./pages/MeetDetails"));
const OrgDetails = lazy(() => import("./pages/OrgDetails"));
const TopBar = lazy(() => import("./components/TopBar"));

const App = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!auth;

  return (
    <Suspense fallback={<LoadingModal show />}>
      <Router>
        {isAuthenticated && <TopBar />}
        <Routes>
          <Route
            path={routes.home}
            element={isAuthenticated ? <Dashboard /> : <HomePage />}
          />
          <Route path={routes.orgs} element={<OrgsPage />} />
          <Route path={routes.orgDetails} element={<OrgDetails />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.meetDetails} element={<MeetDetails />} />

          <Route
            path={routes.calendar}
            element={
              <PrivateRoute>
                <YearCalendar />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.orgConfig}
            element={
              <PrivateRoute>
                <OrgConfiguration />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.orgEdit}
            element={
              <PrivateRoute>
                <OrgConfiguration />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.meetConfig}
            element={
              <PrivateRoute>
                <MeetConfiguration />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.meetEdit}
            element={
              <PrivateRoute>
                <MeetConfiguration />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.trips}
            element={
              <PrivateRoute>
                <Trips />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.userProfile}
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.userEdit}
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.userAvatarEdit}
            element={
              <PrivateRoute>
                <EditAvatar />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
