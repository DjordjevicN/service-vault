import placeholder from "@/assets/placeholder.png";
import gps from "@/assets/map.png";
import Button from "@/components/UI/Button";
import DivideLine from "@/components/UI/DivideLine";
import { useNavigate } from "react-router-dom";
const TextRow = ({ label, details }: { label: string; details: string }) => {
  return (
    <div className="text-[18px]">
      <p className="text-white font-bold">
        {label}: <span className="text-gray55 font-normal">{details}</span>
      </p>
    </div>
  );
};
const RuleRow = ({
  ruleNumber,
  rule,
}: {
  ruleNumber: string;
  rule: string;
}) => {
  return (
    <div className="mb-2">
      <p className="text-white font-bold">{ruleNumber}</p>
      <p className="text-gray55 ">{rule}</p>
    </div>
  );
};

const MeetFormFinish = () => {
  const navigate = useNavigate();
  const handlePublish = () => {
    return navigate("/meet/56454654654");
  };
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center py-10">
        <h2 className="text-gradient text-2xl w-fit">
          Final check before publishing
        </h2>
        <Button onClick={handlePublish}>Publish</Button>
      </div>
      <DivideLine />
      <div className="grid grid-cols-[1fr_1fr] gap-4 mt-10">
        <div>
          <h2 className="text-gradient text-2xl w-fit">Basic Information</h2>
          <div className="mt-6 flex gap-4">
            <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-gray55">
              <img
                src={placeholder}
                alt=""
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <TextRow label="Meet name" details="Kawasaki z900 meet" />
              <TextRow label="Max number of participants" details="Unlimited" />
              <TextRow label="Meet type" details="Bleja" />
              <TextRow label="Date" details="15.6.2025" />
              <TextRow label="Time" details="15:30" />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gradient text-2xl w-fit">Description</h2>
            <p className="text-white mt-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
              atque. Porro libero neque molestiae qui in cum accusantium
              molestias officia minus eos, illum omnis, ea quas aliquid sequi
              sit itaque.Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Vel, atque. Porro libero neque molestiae qui in cum
              accusantium molestias officia minus eos, illum omnis, ea quas
              aliquid sequi sit itaque.Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Vel, atque. Porro libero neque molestiae qui in
              cum accusantium molestias officia minus eos, illum omnis, ea quas
              aliquid sequi sit itaque.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-gradient text-2xl w-fit mb-6">Rules</h2>
            <RuleRow
              ruleNumber="Rule #1"
              rule="Vel, atque. Porro libero neque molestiae qui in cum accusantium
            molestias officia minus eos, illum omnis, ea quas aliquid sequi sit
            itaque."
            />
            <RuleRow
              ruleNumber="Rule #1"
              rule="Vel, atque. Porro libero neque molestiae qui in cum accusantium
            molestias officia minus eos, illum omnis, ea quas aliquid sequi sit
            itaque."
            />
            <RuleRow
              ruleNumber="Rule #1"
              rule="Vel, atque. Porro libero neque molestiae qui in cum accusantium
            molestias officia minus eos, illum omnis, ea quas aliquid sequi sit
            itaque."
            />
            <RuleRow
              ruleNumber="Rule #1"
              rule="Vel, atque. Porro libero neque molestiae qui in cum accusantium
            molestias officia minus eos, illum omnis, ea quas aliquid sequi sit
            itaque."
            />
            <RuleRow
              ruleNumber="Rule #1"
              rule="Vel, atque. Porro libero neque molestiae qui in cum accusantium
            molestias officia minus eos, illum omnis, ea quas aliquid sequi sit
            itaque."
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-gradient text-2xl w-fit">Location</h2>
            <div className="mt-6">
              <div>
                <TextRow label="GPS Location" details="44.3254 , 22.6549" />
                <TextRow label="Address" details="Bulevar zorana djindjica" />
                <TextRow label="City" details="Belgrade" />
                <TextRow label="Country" details="Serbia" />
              </div>
            </div>
            <div className="w-[300px] h-[300px] overflow-hidden bg-gray55 mt-4">
              <img src={gps} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetFormFinish;
