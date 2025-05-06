import logo from "../assets/logo.svg";

const Logo = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex items-center ">
      <div className="flex items-center gap-4 cursor-pointer" onClick={goHome}>
        <img src={logo} alt="app logo" />
        <h1 className="text-gradient font-bold text-2xl">MOTO MEETS</h1>
      </div>
    </div>
  );
};

export default Logo;
