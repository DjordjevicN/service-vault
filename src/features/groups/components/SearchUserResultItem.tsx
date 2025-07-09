import { USER_TYPES } from "@/shared/constants/userTypes";
import { Button } from "@/shared/ui/Button";

const SearchUserResultItem = ({
  user,
  onAdd,
}: {
  user: USER_TYPES;
  onAdd: (user: USER_TYPES) => void;
}) => {
  return (
    <div
      key={user.id}
      className="flex gap-4 items-center bg-accent mb-1 px-4 hover:bg-accent/40 cursor-pointer rounded"
    >
      <p className="w-[100px] overflow-hidden truncate capitalize">
        {user.username}
      </p>
      <p className="w-[150px] overflow-hidden truncate">{user.email}</p>
      <Button variant={"ghost"} onClick={() => onAdd(user)} className="ml-auto">
        Add
      </Button>
    </div>
  );
};

export default SearchUserResultItem;
