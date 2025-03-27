import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/user/SignIn";
import HomePage from "./components/pages/HomePage";
import Register from "./components/pages/Register";
import Dashboard from "./components/user/Dashboard";
import BikeDetails from "./components/bike/BikeDetails";
import NotFound from "./components/pages/NotFound";

const App = () => {
  const isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Router>
    );
  }
  return (
    <div className="flex w-full">
      <Navigation />
      <div className="flex flex-col w-full">
        <TopBar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/motorcycle/:id" element={<BikeDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
