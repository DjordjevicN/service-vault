import StepController from "@/components/StepController";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/store";
import { updateOrgForm } from "@/store/orgFormSlice";
import { useDispatch, useSelector } from "react-redux";

const BasicOrgInformation = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
}) => {
  const dispatch = useDispatch();
  const orgForm = useSelector((state: RootState) => state.organizationForm);
  if (!orgForm) return null;
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-2 mt-2">
      <Card className="p-6">
        <h2 className="text-gradient text-2xl w-fit">Basic Information</h2>
        <p className="text-gray55">
          Add the key details about your organization. Give it a name, define
          the style of the organization, set a rider limit if needed, and write
          a short description to let others know what to expect.
        </p>
      </Card>
      <Card className="p-6">
        <div>
          <Label required htmlFor="org-name">
            Organization name
          </Label>
          <Input
            id="org-name"
            type="text"
            placeholder="Organization name"
            onChange={(e) =>
              dispatch(
                updateOrgForm({
                  key: "name",
                  value: e.target.value.toLowerCase(),
                })
              )
            }
            value={orgForm.name}
          />
          <Label htmlFor="org-email">Organization email</Label>
          <Input
            id="org-email"
            type="email"
            placeholder="Organization email"
            onChange={(e) =>
              dispatch(updateOrgForm({ key: "email", value: e.target.value }))
            }
            value={orgForm.email}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            onChange={(e) =>
              dispatch(
                updateOrgForm({ key: "description", value: e.target.value })
              )
            }
            value={orgForm.description}
            rows={5}
            placeholder="Describe the organization"
          />
        </div>

        <StepController
          section={section}
          handleNext={handleNext}
          handleReset={handleReset}
          handlePrevious={handlePrevious}
          maxSection={maxSection}
          disableNext={!orgForm.name}
        />
      </Card>
    </div>
  );
};

export default BasicOrgInformation;
