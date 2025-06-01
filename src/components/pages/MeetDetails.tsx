import UserRow from "./UserRow";
import HostedByCard from "../HostedByCard";
import clock from "../../assets/clock.svg";
import location from "../../assets/gps.svg";
import MeetDetailsAbout from "../MeetDetailsAbout";
import Counter from "../Counter";
import Button from "../myUiLibrary/Button";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";
import LoadingModal from "../LoadingModal";
import MyMap from "../map/MyMap";
import { googleMapsPinLink } from "@/constants/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { USER_TYPES } from "@/constants/userTypes";
import shield from "../../assets/shield.svg";
import moto from "../../assets/moto.svg";
import money from "../../assets/money.svg";
import {
  useDeleteMeet,
  useMeetDetails,
  useOrganizer,
  useOrganizerOrg,
  useParticipants,
} from "@/hooks/useMeetQueries";
import { MeetType } from "@/constants/meetTypes";
import ConfirmationModal from "../ConfirmationModal";
import { useState } from "react";
import { AuthUser } from "@supabase/supabase-js";
import { Card, CardContent } from "../ui/card";
import MyDropdownMenu from "../myUiLibrary/MyDropdownMenu";
import { Country } from "country-state-city";
import { ORG_MEMBER_STATUS } from "@/constants/orgMemberStatus";
import { useOrgMembers } from "@/hooks/useOrgQueries";
import { useUserAttend } from "@/hooks/useUser";

const MeetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;
  const {
    data: meet,
    isLoading: isMeetLoading,
    refetch: refetchMeetDetails,
  } = useMeetDetails(id);
  const { mutate: deleteMeet } = useDeleteMeet();
  const { data: participants } = useParticipants(meet?.participants);
  const { data: organizer } = useOrganizer(meet?.organizerId);
  const { data: eventOrganizerIsOrganization } = useOrganizerOrg(
    dispatch,
    meet?.organizationId
  );
  const { data: members } = useOrgMembers(meet?.organizationId);
  const { mutate: userAttend } = useUserAttend(refetchMeetDetails);

  const handleAttend = async () => {
    if (user && meet) {
      await userAttend({ user, meet });
    }
  };

  const handleDeleteMeet = (meetId: string) => {
    deleteMeet(meetId);
  };

  const isAdmin = (auth: AuthUser, meet: MeetType) => {
    const isCurrentUserMemberOfOrg = user
      ? members?.find((member) => member.userId === user.id)
      : undefined;
    if (isCurrentUserMemberOfOrg?.status === ORG_MEMBER_STATUS.ADMIN) {
      return true;
    }
    if (auth?.id === meet?.organizerId) {
      return true;
    }
    return false;
  };

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((prev) => !prev);
  };

  const handleEditMeet = () => {
    navigate(`/meet-config/${meet.id}`);
  };
  const areThereAnyRules =
    meet?.rules && meet.rules.length > 0 && meet.rules[0] !== "";
  const totalParticipants = meet?.participants.length;
  const isMaxRidersReached =
    meet?.maxRiders === 0 ? false : meet?.maxRiders === totalParticipants;
  const isUserAttending = meet && user?.attendingMeets?.includes(meet?.id);

  if (isMeetLoading) return <LoadingModal show={isMeetLoading} />;
  return (
    <>
      <div className="mt-2">
        <Card>
          <div className="flex gap-6">
            <img
              src={meet.image || placeholder}
              alt={meet.name}
              className="max-w-[200px]"
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-baseline">
                <h1 className="text-2xl font-bold mb-5">{meet.name}</h1>
                {auth && (
                  <Button
                    onClick={handleAttend}
                    disabled={isMaxRidersReached || isUserAttending}
                  >
                    {isMaxRidersReached
                      ? "Full"
                      : isUserAttending
                      ? "Attending"
                      : "Attend"}
                  </Button>
                )}
                {auth && isAdmin(auth, meet) && (
                  <MyDropdownMenu
                    trigger="Admin Actions"
                    options={[
                      { name: "Edit Meet", action: handleEditMeet },
                      {
                        name: "Delete Meet",
                        action: () => handleDeleteMeet(meet.id),
                      },
                    ]}
                  />
                )}
              </div>
              <HostedByCard
                organizedBy={organizer || eventOrganizerIsOrganization}
              />
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-[2fr_1fr] gap-2">
          <div>
            {meet.description && (
              <MeetDetailsAbout
                title="Details"
                description={meet.description}
              />
            )}
            {areThereAnyRules && (
              <Card className="mt-2">
                <p className="text-sm font-bold text-muted-foreground capitalize">
                  Rules:
                </p>
                {meet.rules.map((rule: string, index: number) => {
                  return (
                    <CardContent className="text-sm" key={index}>
                      {rule}
                    </CardContent>
                  );
                })}
              </Card>
            )}
            <div className="flex gap-2">
              <Card className="mt-2 w-full">
                <Counter label="total" count={totalParticipants} />
              </Card>
              <Card className="mt-2 w-full">
                <Counter label="pending" count={totalParticipants} />
              </Card>
              <Card className="mt-2 w-full">
                <Counter label="confirmed" count={totalParticipants} />
              </Card>
            </div>
            <Card className="mt-2">
              <div className="overflow-auto">
                {meet &&
                  participants?.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      meet={meet}
                      updateUser={refetchMeetDetails}
                    />
                  ))}
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <Card className="px-6 text-sm">
              <div className="flex flex-col gap-4">
                {meet.startDate && (
                  <div className="flex items-start gap-3">
                    <div className="w-5">
                      <img src={clock} alt="clock" />
                    </div>
                    <div className="flex gap-2">
                      <p>{meet.startDate}</p>
                      <p>{meet.startTime}h</p>
                    </div>
                  </div>
                )}
                {meet.gps.latitude && meet.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-5">
                      <img src={location} alt="moto" />
                    </div>
                    <div>
                      <p className="capitalize">
                        Address:{" "}
                        <span>
                          {meet.address} {meet.city}{" "}
                          {Country.getCountryByCode(meet.country)?.name}
                        </span>
                      </p>

                      {meet.gps.latitude && (
                        <a
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          href={googleMapsPinLink(
                            meet.gps.latitude,
                            meet.gps.longitude
                          )}
                          className="w-fit ml-auto"
                        >
                          <p className="text-xs">
                            Show{" "}
                            <span className="text-blue-400">GoogleMaps</span>
                          </p>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 ">
                  <div className="w-5">
                    <img src={moto} alt="moto" />
                  </div>
                  <div>
                    <p className="capitalize">
                      Max riders: <span>{meet?.maxRiders || "Unlimited"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 ">
                  <div className="w-5">
                    <img src={money} alt="money" />
                  </div>
                  <div>
                    <p className="capitalize">
                      <span>{meet?.price || "FREE"}</span>
                    </p>
                  </div>
                </div>
                {meet?.rideType && (
                  <div className="flex items-start gap-2 ">
                    <div className="w-5">
                      <img src={shield} alt="moto" />
                    </div>
                    <div>
                      <p className="capitalize">
                        Ride style:{" "}
                        <span className="text-white">{meet?.rideType}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            {meet.gps.latitude && (
              <Card className="p-2">
                <div className="relative z-10">
                  <MyMap
                    long={meet.gps.longitude}
                    lat={meet.gps.latitude}
                    disableMarker
                  />
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        show={isConfirmationModalOpen}
        close={() => toggleConfirmationModal()}
        confirm={() => {
          handleDeleteMeet(meet.id);
          toggleConfirmationModal();
        }}
        title="Are you sure you want to delete this meet?"
      />
    </>
  );
};

export default MeetDetails;
