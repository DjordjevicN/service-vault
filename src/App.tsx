import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import MeetDetails from "./components/pages/MeetDetails";
import { ReactNode } from "react";
import Navigation from "./components/navigation/Navigation";
import TopBar from "./components/TopBar";
import Meets from "./components/pages/Meets";
import Trips from "./components/pages/Trips";
const isAuthenticated = true;
const isHomePage = window.location.pathname === "/";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {!isHomePage && <TopBar />}
      <div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
        {!isHomePage && <Navigation />}
        <div>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/meets"
              element={
                <PrivateRoute>
                  <Meets />
                </PrivateRoute>
              }
            />
            <Route
              path="/meet/:meetId"
              element={
                <PrivateRoute>
                  <MeetDetails />
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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
