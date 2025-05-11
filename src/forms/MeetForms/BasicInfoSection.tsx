import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import Textarea from "@/components/UI/Textarea";
import { useState } from "react";

const BasicInfoSection = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("show-off");
  const [numberOfRiders, setNumberOfRiders] = useState<number>();
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
          onChange={(value) => setName(value as string)}
          value={name}
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
          onChange={(value) => setType(value)}
          value={type}
        />
        <Input
          type="number"
          placeholder="Number of riders"
          label="Number of riders"
          onChange={(value) => setNumberOfRiders(Number(value))}
          value={numberOfRiders}
          description="If you set number of riders to 0, it will be unlimited"
        />
        <Textarea
          onChange={(value) => setDescription(value)}
          value={description}
          label="Description"
          rows={5}
          placeholder="Describe the ride"
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
