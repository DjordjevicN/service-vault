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
    <div className="p-5">
      <div className="flex gap-3">
        <div>
          <img src={user.photoURL} alt="" className="rounded w-30 h-30" />
        </div>
        <div>
          <p className="text-2xl">{user.displayName}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.uid}</p>
          <Button onClick={handleLogout} className="mt-3 cursor-pointer">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
