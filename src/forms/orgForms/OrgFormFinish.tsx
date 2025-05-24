import TextRow from "@/components/TextRow";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { IMember, IOrganization } from "@/constants/orgTypes";
import { RootState } from "@/store";
import { createOrg, updateOrg } from "@/supabase/orgFetchers";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import placeholder from "@/assets/placeholder.png";
import MyMap from "@/components/map/MyMap";
import { ORG_MEMBER_STATUS_LABELS } from "@/constants/orgMemberStatus";

const OrgFormFinish = ({ isUpdate }: { isUpdate: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orgForm = useSelector((state: RootState) => state.organizationForm);
  const user = useSelector((state: RootState) => state.user);

  const { mutate: createOrgMutation } = useMutation({
    mutationFn: (org: IOrganization) => createOrg(org),
    onSuccess: (data) => {
      if (!data) {
        console.error("No data returned from createOrg");
        return;
      }

      navigate(`/org/${data[0].id}`);
    },
    onError: (error) => {
      console.error("Error creating org:", error);
    },
  });
  const { mutate: updateOrgConfiguration } = useMutation({
    mutationFn: (updatedOrg: IOrganization) =>
      updateOrg(orgForm.id, updatedOrg),
    onSuccess: (data) => {
      console.log("Org updated successfully", data);
      if (!data) {
        console.error("No data returned from createOrg");
        return;
      }

      navigate(`/org/${orgForm.id}`);
    },
    onError: (error) => {
      console.error("Error creating org:", error);
    },
  });
  const handleSubmit = () => {
    if (isUpdate) {
      updateOrgConfiguration(orgForm);
      return;
    }
    if (!user) return;

    const newOrg = {
      ...orgForm,
      admin: Number(user.id),
    };
    createOrgMutation(newOrg);
  };
  return (
    <div className="">
      <Card className="px-6 mt-4">
        <div className="flex justify-between items-center">
          <h2 className="w-fit">
            <span className="text-gradient">Final check</span> before publishing
          </h2>
          <Button className="div-gradient" onClick={handleSubmit}>
            Publish
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
        <Card>
          <img src={orgForm.image || placeholder} alt="Org banner" />
          <div>
            <TextRow label="Organization Name" details={orgForm.name} />
            <TextRow label="Admin" details={user?.username} />
          </div>
          <div>
            <p className="font-bold">Description:</p>
            <p className="text-xs mt-2 text-muted-foreground">
              {orgForm.description || ""}
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <MyMap
              lat={orgForm.gps.latitude || 44.7866}
              long={orgForm.gps.longitude || 20.4489}
            />
            <TextRow
              className="capitalize mt-4"
              label="Address"
              details={orgForm.address}
            />
            <TextRow
              className="capitalize"
              label="Country"
              details={orgForm.country}
            />
            <TextRow
              className="capitalize"
              label="City"
              details={orgForm.city}
            />
          </div>
        </Card>
        <Card>
          <div>
            <TextRow label="Email" details={orgForm.email} />
            <TextRow label="Website" details={orgForm?.customLink || ""} />
            <TextRow label="Instagram" details={orgForm?.instagram || ""} />
            <TextRow label="Facebook" details={orgForm?.facebook || ""} />
            <TextRow label="Twitter" details={orgForm?.twitter || ""} />
            <TextRow label="YouTube" details={orgForm?.youtube || ""} />
          </div>
        </Card>
        <Card>
          <CardTitle>Members</CardTitle>
          <div>
            {orgForm.members &&
              orgForm.members.length > 0 &&
              orgForm.members.map((member: IMember) => {
                return (
                  <div
                    key={member.userId}
                    className="flex gap-3 mb-1 items-center bg-accent p-2 rounded"
                  >
                    <p className="w-28 overflow-hidden truncate">
                      {member.username}
                    </p>
                    <p>{ORG_MEMBER_STATUS_LABELS[member.status]}</p>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrgFormFinish;
