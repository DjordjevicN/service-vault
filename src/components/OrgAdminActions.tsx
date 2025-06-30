import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/constants/routes";
import { useDeleteOrganization } from "@/hooks/useOrgQueries";

const OrgAdminActions = ({
  isAdmin,
  orgId,
}: {
  isAdmin: boolean;
  orgId: number;
}) => {
  const navigate = useNavigate();
  const [isAdminZoneLocked, setIsAdminZoneLocked] = useState(true);
  const { mutate: removeOrganization } = useDeleteOrganization(() =>
    navigate(routes.home)
  );

  const deleteOrganization = () => {
    if (!orgId) return;
    if (!window.confirm("Are you sure you want to delete this organization?")) {
      return;
    }
    removeOrganization(orgId);
  };

  if (!isAdmin) return null;
  return (
    <Card className="mt-2 border-red-400">
      <div className="flex items-center gap-4">
        <p>Admin Zone</p>
        <Button
          onClick={() => setIsAdminZoneLocked(!isAdminZoneLocked)}
          className="w-fit text-red-400"
          variant="ghost"
        >
          {isAdminZoneLocked ? "Unlock Admin Zone" : "Lock Admin Zone"}
        </Button>
        <Button
          disabled={isAdminZoneLocked}
          onClick={deleteOrganization}
          className={`${isAdminZoneLocked ? "text-muted" : "text-white"}`}
          variant={isAdminZoneLocked ? "ghost" : "destructive"}
        >
          Delete Organization
        </Button>
      </div>
    </Card>
  );
};

export default OrgAdminActions;
