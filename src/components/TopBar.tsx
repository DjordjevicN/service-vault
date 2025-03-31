import { useUser } from "@/context/AuthContext";
import { Button } from "../components/ui/button";
import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const TopBar = () => {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(!isOpen));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="border-b w-full flex items-center  p-4">
      <h1>Dashboard</h1>
      <div
        className="ml-auto relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user && user.photoURL ? (
          <div className="flex items-center justify-center ">
            <img
              src={user.photoURL}
              alt=""
              className="rounded-full w-10 h-10 "
            />
          </div>
        ) : (
          <div className="rounded-full bg-gray-800 w-10 h-10 flex items-center justify-center ml-auto">
            N
          </div>
        )}
      </div>
      {isOpen && (
        <div
          ref={ref}
          className="text-sm text-gray-500 absolute right-3 top-15 bg-white shadow-md rounded-lg p-5 w-60 z-20 border"
        >
          <p>{user?.displayName}</p>
          <p>{user?.email}</p>
          <Button onClick={handleLogout} className="mt-3 cursor-pointer">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
