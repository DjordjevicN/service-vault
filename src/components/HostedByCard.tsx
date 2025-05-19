import Avatar from "./Avatar";

const HostedByCard = ({ organizedBy }: { organizedBy: string }) => {
  if (!organizedBy) return null;
  return (
    <div className="flex gap-3">
      <Avatar url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <div className="">
        <p className="text-gray55 text-sm font-light">Hosted by</p>
        <p className="text-white">{organizedBy?.username}</p>
      </div>
    </div>
  );
};

export default HostedByCard;
