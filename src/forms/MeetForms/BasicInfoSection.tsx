import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Textarea from "@/components/UI/Textarea";
import { updateMeetForm } from "@/store/formsSlice";

const BasicInfoSection = () => {
  const dispatch = useDispatch();
  const meetForm = useSelector((state: RootState) => state.meetForm);
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <div>
        <h2 className="text-gradient text-2xl w-fit">Basic Information</h2>
        <p className="text-gray55 mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
          Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
          nesciunt!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Meet name"
          onChange={(value) => dispatch(updateMeetForm({ key: "name", value }))}
          value={meetForm.name}
          label="Name"
        />

        <Select
          label="Type of meet"
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

        <Input
          type="number"
          placeholder="Number of riders"
          label="Number of riders"
          onChange={(value) =>
            dispatch(
              updateMeetForm({
                key: "maxRiders",
                value: value,
              })
            )
          }
          value={meetForm.maxRiders}
          description="If you set number of riders to 0, it will be unlimited"
        />

        <Textarea
          onChange={(value) =>
            dispatch(updateMeetForm({ key: "description", value }))
          }
          value={meetForm.description}
          label="Description"
          rows={5}
          placeholder="Describe the ride"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
