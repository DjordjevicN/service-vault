import { IOrganization } from "@/constants/orgTypes";
import placeholder from "../assets/placeholder.png";
import { useNavigate } from "react-router-dom";

const DashboardGroupItem = ({ group }: { group: IOrganization }) => {
  const navigate = useNavigate();
  if (!group) return null;
  const handleRedirect = (id: number) => {
    navigate(`/org/${id}`);
  };

  return (
    <div
      className="flex gap-4 p-4 rounded mb-4 cursor-pointer"
      onClick={() => handleRedirect(group.id!)}
    >
      <img src={placeholder} alt="group banner" className="w-[100px]" />
      <div>
        <h2>{group.name}</h2>
        <p className="text-xs text-muted-foreground">
          Members: <span className="text-white">{group.members.length}</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardGroupItem;
