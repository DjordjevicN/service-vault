import { USER_TYPES } from "@/constants/userTypes";
import Avatar from "./Avatar";
import { IOrganization } from "@/constants/orgTypes";

const HostedByCard = ({
  organizedBy,
}: {
  organizedBy: USER_TYPES | IOrganization;
}) => {
  if (!organizedBy) return null;
  return (
    <div className="flex gap-3">
      <Avatar url={organizedBy?.image} />
      <div className="">
        <p className="text-gray55 text-sm font-light">Hosted by</p>
        <p className="text-white capitalize">
          {organizedBy?.username || organizedBy.name}
        </p>
      </div>
    </div>
  );
};

export default HostedByCard;
