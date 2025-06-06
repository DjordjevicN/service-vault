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
import { Button } from "@/components/ui/Button";
import TextRow from "@/components/TextRow";
import { getDate, getFormattedDate } from "@/components/utils/getDates";
import { USER_TYPES } from "@/constants/userTypes";
import { IOrganization } from "@/constants/orgTypes";
import StepController from "@/components/StepController";
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

const MeetFormFinish = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
  isUpdate,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
  isUpdate: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetForm = useSelector((state: RootState) => state.meetForm);
  const organization = useSelector(
    (state: RootState) => state.organization
  ) as IOrganization | null;
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
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
      organizerId: orgId ? null : user.uuid,
      organizationId: orgId ? Number(orgId) : null,
      country: meetForm.country || user.country || "world",
      organizerName: orgId ? organization?.name : user.username,
    };
    mutate(updatedMeetForm);
  };

  const validateMeetForm = () => {
    if (!meetForm.name || !meetForm.startDate) {
      return false;
    }
    if (!meetForm.gps.latitude || !meetForm.gps.longitude) {
      return false;
    }

    return true;
  };

  return (
    <div className="text-sm">
      <Card className="px-6 mt-2">
        <div className="flex justify-between items-center">
          <h2 className=" w-fit">
            <span className="text-gradient">Final check</span> before publishing
          </h2>
          <div
            className="flex flex-row-reverse
          items-center gap-4"
          >
            <Button
              disabled={!validateMeetForm()}
              className="div-gradient"
              onClick={handlePublish}
            >
              Publish
            </Button>
            {!validateMeetForm() && (
              <div>
                <p className="text-red-500 text-xs">
                  Please fill in all required fields.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_1fr] gap-4 mt-2">
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
                <TextRow
                  label="Date"
                  details={`${getFormattedDate(meetForm.startDate)} ${
                    meetForm.endDate &&
                    `- ${getFormattedDate(meetForm.endDate)}`
                  }`}
                />
                <TextRow label="Time" details={meetForm.startTime} />
              </div>
            </div>
          </Card>
          <Card className="mt-2 px-6">
            <div>
              <h2 className="w-fit">Description</h2>
              <p className="whitespace-pre-line text-base mt-6">
                {meetForm.description || "No description"}
              </p>
            </div>
          </Card>
          <Card className="mt-2 px-6">
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
              <div className="overflow-hidden bg-gray55 mt-2">
                <MyMap
                  lat={meetForm.gps.latitude || 44.7866}
                  long={meetForm.gps.longitude || 20.4489}
                />
              </div>
            </div>
          </div>{" "}
          <div className="ml-auto">
            <StepController
              section={section}
              handleNext={handleNext}
              handleReset={handleReset}
              handlePrevious={handlePrevious}
              maxSection={maxSection}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MeetFormFinish;
