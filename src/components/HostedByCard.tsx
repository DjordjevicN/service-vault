import Avatar from "./Avatar";

const HostedByCard = ({ organizedBy }: { organizedBy: string }) => {
  if (!organizedBy) return null;
  return (
    <div className="flex gap-3">
      <Avatar url={organizedBy?.image} />
      <div className="">
        <p className="text-gray55 text-sm font-light">Hosted by</p>
        <p className="text-white">{organizedBy?.username}</p>
      </div>
    </div>
  );
};

export default HostedByCard;
