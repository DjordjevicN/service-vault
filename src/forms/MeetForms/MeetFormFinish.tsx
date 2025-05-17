import placeholder from "@/assets/placeholder.png";
import Button from "@/components/UI/Button";
import DivideLine from "@/components/UI/DivideLine";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MyMap from "@/components/map/MyMap";
import { USER_TYPES } from "@/constants/userTypes";
const TextRow = ({
  label,
  details,
}: {
  label: string;
  details: string | number;
}) => {
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
  const meetForm = useSelector((state: RootState) => state.meetForm);
  const user = useSelector((state: RootState) => state.user) as {
    id: string;
  } | null;
  console.log("user", user);

  console.log("meetForm", meetForm);

  const handlePublish = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const updatedMeetForm = {
      ...meetForm,
      organizerId: user.id,
    };

    return null;
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
                src={meetForm?.image || placeholder}
                alt=""
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <TextRow
                label="Meet name"
                details={meetForm?.name || "No Meet Name"}
              />
              <TextRow
                label="Max riders"
                details={meetForm.maxRiders || "Unlimited"}
              />
              <TextRow label="Meet type" details={meetForm.rideType} />
              <TextRow label="Date" details={meetForm.startDate} />
              <TextRow label="Time" details={meetForm.startTime} />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-gradient text-2xl w-fit">Description</h2>
            <p className="text-white mt-6">
              {meetForm.description || "No description"}
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-gradient text-2xl w-fit mb-6">Rules</h2>
            {meetForm.rules.map((rule, index) => {
              return (
                <RuleRow
                  ruleNumber={`Rule #${index + 1}`}
                  key={index}
                  rule={rule}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-gradient text-2xl w-fit">Location</h2>
            <div className="mt-6">
              <div>
                {meetForm.location.latitude && (
                  <TextRow
                    label="GPS Location"
                    details={`${meetForm.location.latitude}.${meetForm.location.longitude}`}
                  />
                )}
                <TextRow label="Address" details={meetForm.address} />
                <TextRow label="City" details={meetForm.city} />
                <TextRow label="Country" details={meetForm.country} />
              </div>
            </div>
            <div className="w-[300px] h-[300px] overflow-hidden bg-gray55 mt-4">
              <MyMap
                lat={meetForm.location.latitude || 44.7866}
                long={meetForm.location.longitude || 20.4489}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetFormFinish;
