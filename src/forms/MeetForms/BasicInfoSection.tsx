import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Select from "@/components/myUiLibrary/Select";
import { updateMeetForm } from "@/store/meetFormSlice";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import StepController from "@/components/StepController";

const BasicInfoSection = ({
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
  const meetForm = useSelector((state: RootState) => state.meetForm);
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-2">
      <Card className="p-6">
        <h2 className="text-gradient text-2xl w-fit">Basic Information</h2>
        <p className="text-gray55">
          Add the key details about your ride. Give it a name, define the style
          of the meet, set a rider limit if needed, and write a short
          description to let others know what to expect.
        </p>
      </Card>
      <Card className="p-6">
        <div>
          <Label required htmlFor="meet-name">
            Meet name
          </Label>
          <Input
            required
            id="meet-name"
            type="text"
            placeholder="Meet name"
            onChange={(e) =>
              dispatch(updateMeetForm({ key: "name", value: e.target.value }))
            }
            value={meetForm.name}
          />
          <Label htmlFor="type">Ride Type</Label>
          <Select
            options={[
              { label: "Show off", value: "show-off" },
              { label: "Casual", value: "casual" },
              { label: "Spirit", value: "spirit" },
              { label: "Reckless", value: "reckless" },
            ]}
            onChange={(value) =>
              dispatch(updateMeetForm({ key: "rideType", value }))
            }
            value={meetForm.rideType}
          />
          <Label htmlFor="max-riders">Max Riders</Label>
          <Input
            className="mb-2"
            type="number"
            placeholder="Number of riders"
            id="max-riders"
            onChange={(e) =>
              dispatch(
                updateMeetForm({
                  key: "maxRiders",
                  value: e.target.value,
                })
              )
            }
            value={meetForm.maxRiders}
          />
          <p className="text-sm text-muted-foreground mb-4">
            If you set number of riders to 0, it will be unlimited
          </p>{" "}
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Price in $"
            onChange={(e) =>
              dispatch(updateMeetForm({ key: "price", value: e.target.value }))
            }
            value={meetForm.price || 0}
          />
          <p className="text-sm text-muted-foreground mb-4">
            If you set price to 0, it will be free
          </p>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            onChange={(e) =>
              dispatch(
                updateMeetForm({ key: "description", value: e.target.value })
              )
            }
            value={meetForm.description}
            rows={5}
            placeholder="Describe the ride"
          />
        </div>
        <div className="ml-auto">
          <StepController
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
            disableNext={!meetForm.name}
          />
        </div>
      </Card>
    </div>
  );
};

export default BasicInfoSection;
