import ServiceCardForm from "./components/bike/ServiceCardForm";
import Navigation from "./components/Navigation";
import TopBar from "./components/TopBar";

import SignIn from "./components/user/SignIn";

const App = () => {
  const isUserLoggedIn = true;
  if (!isUserLoggedIn) return <SignIn />;
  return (
    <div className="flex w-full">
      <Navigation />
      <div className="flex flex-col w-full">
        <TopBar />
        {/* <Dashboard /> */}
        <ServiceCardForm />
      </div>
    </div>
  );
};

export default App;
