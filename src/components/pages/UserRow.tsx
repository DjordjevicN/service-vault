import Avatar from "../Avatar";
import { getStatusColor } from "../utils/getStatusColor";

const UserRow = ({ user }: { user: any }) => {
  console.log(user);

  return (
    <div className="flex items-center mb-3 p-2 gap-6 bg-gray80 rounded">
      <Avatar size={32} />

      <div className="min-w-[150px] overflow-hidden">
        <p className="text-white text-sm">{user.name}</p>
      </div>
      <div>
        <p className="text-gray55 text-sm">{user.motorcycle}</p>
      </div>
      <div className="ml-auto flex items-center w-[100px]">
        <p className={`text-sm text-left ${getStatusColor(user.status)}`}>
          {user.status}
        </p>
      </div>
    </div>
  );
};

export default UserRow;
