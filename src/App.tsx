import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import MeetDetails from "./components/pages/MeetDetails";
import TopBar from "./components/TopBar";
import Meets from "./components/pages/Meets";
import Trips from "./components/pages/Trips";
import UserProfile from "./components/pages/UserProfile";
import Register from "./components/pages/Register";
import SuperAdmin from "./components/pages/SuperAdmin";
import Login from "./components/pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import OrganizationPage from "./components/pages/OrganizationPage";

import EditUser from "./components/pages/EditUser";
import PrivateRoute from "./PrivateRoute";
import MeetConfiguration from "./components/pages/MeetConfiguration";

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!user;

  return (
    <div className="max-w-[1440px] mx-auto">
      <Router>
        <TopBar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <HomePage />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meet/:id" element={<MeetDetails />} />

          {/* Protected Routes */}

          <Route
            path="/meets"
            element={
              <PrivateRoute>
                <Meets />
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
            path="/org/:id"
            element={
              <PrivateRoute>
                <OrganizationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin"
            element={
              <PrivateRoute>
                <SuperAdmin />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
