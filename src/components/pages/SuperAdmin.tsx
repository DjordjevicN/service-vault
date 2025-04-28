import { getUsers } from "@/api/userApi";
import { USER_TYPES } from "@/constants/userTypes";
import { useQuery } from "@tanstack/react-query";

const SuperAdmin = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  return (
    <div>
      {users.map((user: USER_TYPES) => {
        return (
          <div key={user.id}>
            {user.id} - {user.username}
          </div>
        );
      })}
    </div>
  );
};

export default SuperAdmin;
