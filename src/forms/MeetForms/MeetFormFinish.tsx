import placeholder from "@/assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import MyMap from "@/components/map/MyMap";
import { useMutation } from "@tanstack/react-query";
import { createMeet, updateMeet } from "@/supabase/meetFetchers";
import { storeUserMeets } from "@/store/meetSlice";
import { MeetType } from "@/constants/meetTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextRow from "@/components/TextRow";
import { getDate } from "@/components/utils/getDates";
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

const MeetFormFinish = ({ isUpdate }: { isUpdate: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetForm = useSelector((state: RootState) => state.meetForm);
  const user = useSelector((state: RootState) => state.user) as {
    id: string;
  } | null;
  const orgId = localStorage.getItem("orgId");
  const { mutate } = useMutation({
    mutationFn: (meet: MeetType) => createMeet(meet),
    onSuccess: (data) => {
      if (!data) {
        console.error("No data returned from createMeet");
        return;
      }
      dispatch(storeUserMeets(data[0]));
      localStorage.removeItem("orgId");
      navigate(`/meet/${data[0].id}`);
    },
    onError: (error) => {
      console.error("Error creating meet:", error);
    },
  });

  const { mutate: updateMeetConfiguration } = useMutation({
    mutationFn: (updatedMeet: MeetType) => updateMeet(meetForm.id, updatedMeet),
    onSuccess: (data) => {
      console.log("Meet updated successfully", data);
      if (!data) {
        console.error("No data returned from createMeet");
        return;
      }
      dispatch(storeUserMeets(data[0]));
      localStorage.removeItem("orgId");
      navigate(`/meet/${meetForm.id}`);
    },
    onError: (error) => {
      console.error("Error creating meet:", error);
    },
  });

  const handlePublish = () => {
    if (isUpdate) {
      updateMeetConfiguration(meetForm);
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }

    const updatedMeetForm = {
      ...meetForm,
      participants: [user.id],
      organizerId: user.uuid,
      organizationId: orgId ? Number(orgId) : null,
      country: meetForm.country || user.country || "world",
    };
    mutate(updatedMeetForm);
  };

  return (
    <div>
      <Card className="px-6 mt-4">
        <div className="flex justify-between items-center">
          <h2 className=" w-fit">
            <span className="text-gradient">Final check</span> before publishing
          </h2>
          <Button className="div-gradient" onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
        <div>
          <Card className="px-6">
            <h2 className="w-fit">Basic Information</h2>
            <div className="flex gap-4">
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
                <TextRow label="Date" details={getDate(meetForm.startDate)} />
                <TextRow label="Time" details={meetForm.startTime} />
              </div>
            </div>
          </Card>
          <Card className="mt-4 px-6">
            <div>
              <h2 className="w-fit">Description</h2>
              <p className="text-white mt-6">
                {meetForm.description || "No description"}
              </p>
            </div>
          </Card>
          <Card className="mt-4 px-6">
            <div className="mt-6">
              <h2 className="w-fit mb-6">Rules</h2>
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
          </Card>
        </div>
        <Card className="px-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="w-fit">Location</h2>
              <div className="mt-6">
                <div>
                  {meetForm.gps.latitude && (
                    <TextRow
                      label="GPS Location"
                      details={`${meetForm.gps.latitude}.${meetForm.gps.longitude}`}
                    />
                  )}
                  <TextRow label="Address" details={meetForm.address} />
                  <TextRow label="City" details={meetForm.city} />
                  <TextRow label="Country" details={meetForm.country} />
                </div>
              </div>
              <div className="overflow-hidden bg-gray55 mt-4">
                <MyMap
                  lat={meetForm.gps.latitude || 44.7866}
                  long={meetForm.gps.longitude || 20.4489}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MeetFormFinish;
