import Avatar from "./Avatar";
import { getUserById } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

const HostedByCard = ({ organizedBy }: { organizedBy: string }) => {
  const { data: organizer } = useQuery({
    queryKey: ["organizer", organizedBy],
    queryFn: () => getUserById(organizedBy as string),
    enabled: !!organizedBy,
  });
  if (!organizedBy) return null;
  return (
    <div className="flex gap-3">
      <Avatar url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <div className="">
        <p className="text-gray55 text-sm font-light">Hosted by</p>
        <p className="text-white">{organizer?.username}</p>
      </div>
    </div>
  );
};

export default HostedByCard;
