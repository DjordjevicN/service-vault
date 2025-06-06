import TextRow from "@/components/TextRow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { IOrganization } from "@/constants/orgTypes";
import { RootState } from "@/store";
import { createNewMember, createOrg, updateOrg } from "@/supabase/orgFetchers";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import placeholder from "@/assets/placeholder.png";
import MyMap from "@/components/map/MyMap";
import { USER_TYPES } from "@/constants/userTypes";
import { resetOrgForm } from "@/store/orgFormSlice";
import StepController from "@/components/StepController";

const OrgFormFinish = ({
  isUpdate,
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
}: {
  isUpdate: boolean;
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orgForm = useSelector((state: RootState) => state.organizationForm);
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;

  const { mutate: createOrgMutation } = useMutation({
    mutationFn: (org: IOrganization) => createOrg(org),
    onSuccess: (data) => {
      if (!data) {
        console.error("No data returned from createOrg");
        return;
      }
      if (!user) return;
      const newMember = {
        userId: user.id!,
        orgId: data[0].id,
        status: 1,
        username: user.username || "",
        image: user.image || "",
      };
      createNewMember(newMember);
      dispatch(resetOrgForm());
      navigate(`/org/${data[0].id}`);
    },
    onError: (error) => {
      console.error("Error creating org:", error);
    },
  });
  const { mutate: updateOrgConfiguration } = useMutation({
    mutationFn: (updatedOrg: IOrganization) =>
      updateOrg(orgForm.id!, updatedOrg),
    onSuccess: (data) => {
      console.log("Org updated successfully", data);
      if (!data) {
        console.error("No data returned from createOrg");
        return;
      }
      dispatch(resetOrgForm());
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
      admin: Number(user.id!),
      members: [Number(user.id!)],
    };

    createOrgMutation(newOrg);
  };
  return (
    <div className="">
      <Card className="px-6 mt-2">
        <div className="flex justify-between items-center">
          <h2 className="w-fit">
            <span className="text-gradient">Final check</span> before publishing
          </h2>
          <Button
            disabled={!orgForm.name}
            className="div-gradient"
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_1fr] gap-2 mt-2">
        <Card>
          <img
            src={orgForm.image || placeholder}
            alt="Org banner"
            className="max-w-[200px]"
          />
          <div>
            <TextRow label="Organization Name" details={orgForm.name} />
            <TextRow label="Admin" details={user?.username ?? ""} />
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
              className="capitalize mt-2"
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
            <TextRow label="Email" details={orgForm.email} />
            <TextRow label="Website" details={orgForm?.customLink || ""} />
            <TextRow label="Instagram" details={orgForm?.instagram || ""} />
            <TextRow label="Facebook" details={orgForm?.facebook || ""} />
            <TextRow label="Twitter" details={orgForm?.twitter || ""} />
            <TextRow label="YouTube" details={orgForm?.youtube || ""} />
          </div>{" "}
          <StepController
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        </Card>
      </div>
    </div>
  );
};

export default OrgFormFinish;
