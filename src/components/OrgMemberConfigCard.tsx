import { ORG_MEMBER_STATUS } from "@/constants/orgMemberStatus";
import { Button } from "./ui/Button";

const OrgMemberConfigCard = ({
  member,
  onRemove,
  onChangeStatus,
}: {
  member: { userId: number; username: string; status: number };
  onRemove: (userId: number) => void;
  onChangeStatus: (userId: number, status: number) => void;
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b ">
      <h3>{member.username}</h3>
      <select
        value={member.status}
        onChange={(e) => onChangeStatus(member.userId, Number(e.target.value))}
        className="border rounded-md px-4 py-2 text-sm bg-background"
      >
        <option value={ORG_MEMBER_STATUS.MEMBER}>Member</option>
        <option value={ORG_MEMBER_STATUS.ADMIN}>Admin</option>
        <option value={ORG_MEMBER_STATUS.MODERATOR}>Moderator</option>
        <option value={ORG_MEMBER_STATUS.ORG_PRESIDENT}>President</option>
      </select>

      <Button variant="outline" onClick={() => onRemove(member.userId)}>
        Remove
      </Button>
    </div>
  );
};

export default OrgMemberConfigCard;
