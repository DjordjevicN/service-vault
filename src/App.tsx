import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import MeetDetails from "./components/pages/MeetDetails";
import Navigation from "./components/navigation/Navigation";
import TopBar from "./components/TopBar";
import Meets from "./components/pages/Meets";
import Trips from "./components/pages/Trips";
import UserProfile from "./components/pages/UserProfile";
import Register from "./components/pages/Register";
import SuperAdmin from "./components/pages/SuperAdmin";
import Login from "./components/pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!user;
  return (
    <div className="max-w-[1440px] mx-auto">
      <Router>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        ) : (
          <>
            <TopBar />
            <div>
              <Navigation />
              <div>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/meets" element={<Meets />} />
                  <Route path="/meet/:meetId" element={<MeetDetails />} />
                  <Route path="/trips" element={<Trips />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/superadmin" element={<SuperAdmin />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
};

export default App;
