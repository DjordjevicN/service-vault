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
import UserProfile from "./components/pages/UserProfile";
import Register from "./components/pages/Register";
const isAuthenticated = false;

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <TopBar />
          <div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
            <Navigation />
            <div>
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/meets" element={<Meets />} />
                  <Route path="/meet/:meetId" element={<MeetDetails />} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/profile" element={<UserProfile />} />
                </Routes>
              </PrivateRoute>
            </div>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
