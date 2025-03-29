import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";

import HomePage from "./components/pages/HomePage";
import Register from "./components/pages/Register";

import BikeDetails from "./components/bike/BikeDetails";
import NotFound from "./components/pages/NotFound";
import ServiceReport from "./components/pages/ServiceReport";
import UserProfile from "./components/pages/UserProfile";
import SignIn from "./components/pages/SignIn";
import Dashboard from "./components/pages/Dashboard";
import NewBikeForm from "./components/forms/NewBikeForm";
import { useUser } from "./context/AuthContext";

const App = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      ) : (
        <div className="flex w-full">
          <Navigation />
          <div className="flex flex-col w-full">
            <TopBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/motorcycle/:id" element={<BikeDetails />} />
              <Route path="/new-bike" element={<NewBikeForm />} />
              <Route
                path="/motorcycle/:id/:serviceId"
                element={<ServiceReport />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
