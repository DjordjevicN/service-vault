import { useUser } from "@/context/AuthContext";
import { Button } from "../ui/button";

const UserProfile = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  if (!user.photoURL) {
    return <div>No photo available</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="p-5">
        <div className="flex gap-3 border p-5 rounded-lg shadow-md">
          <div>
            <img
              src={user.photoURL}
              alt=""
              className="rounded w-30 h-30 object-cover"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <p className="text-2xl">{user.displayName}</p>
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.uid}</p>
            <Button onClick={handleLogout} className="mt-3 cursor-pointer">
              Logout
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          <div className="rounded-lg shadow-md p-5 mt-5">
            <h1>Next Service</h1>
          </div>
          <div className="rounded-lg shadow-md p-5 mt-5">
            <h1>Next Service</h1>
          </div>
          <div className="rounded-lg shadow-md p-5 mt-5">
            <h1>Next Service</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
