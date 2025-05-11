import Avatar from "../Avatar";
import { getStatusColor } from "../utils/getStatusColor";
import { userRowType } from "./MeetDetails";

const UserRow = ({ user }: { user: userRowType }) => {
  const navigateToUser = (id: string) => {
    console.log(`Navigate to user with id: ${id}`);
  };
  return (
    <div
      className="flex items-center mb-3 p-2 gap-6 bg-gray80 rounded"
      onClick={() => navigateToUser(user.id)}
    >
      <Avatar url={user.image} size={32} />

      <div className="min-w-[150px] overflow-hidden">
        <p className="text-white text-sm">{user.name}</p>
      </div>
      <div>
        <p className="text-gray55 text-sm">
          {user.motorcycle !== "" ? user.motorcycle : "/"}
        </p>
      </div>
      <div className="ml-auto flex items-center w-[100px]">
        <p
          className={`text-sm text-left capitalize ${getStatusColor(
            user.status
          )}`}
        >
          {user.status}
        </p>
      </div>
    </div>
  );
};

export default UserRow;
