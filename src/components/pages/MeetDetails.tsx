import UserRow from "./UserRow";
import HostedByCard from "../HostedByCard";
import clock from "../../assets/clock.svg";
import location from "../../assets/gps.svg";
import MeetDetailsAbout from "../MeetDetailsAbout";
import Counter from "../Counter";
import Button from "../myUiLibrary/Button";
import { useNavigate, useParams } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import LoadingModal from "../LoadingModal";
import { getDate } from "../utils/getDates";
import MyMap from "../map/MyMap";
import { googleMapsPinLink } from "@/constants/helperFunctions";
import { updateMeet } from "@/supabase/meetFetchers";
import { updateUserProfile } from "@/supabase/userFetchers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { USER_TYPES } from "@/constants/userTypes";
import shield from "../../assets/shield.svg";
import moto from "../../assets/moto.svg";
import { storeUser } from "@/store/userSlice";
import {
  useDeleteMeet,
  useMeetDetails,
  useOrganizer,
  useParticipants,
} from "@/hooks/useMeetQueries";
import { MeetType } from "@/constants/meetTypes";
import ConfirmationModal from "../ConfirmationModal";
import { useState } from "react";
import { AuthUser } from "@supabase/supabase-js";
import { Card, CardContent } from "../ui/card";
import MyDropdownMenu from "../myUiLibrary/MyDropdownMenu";

const MeetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const auth = useSelector((state: RootState) => state.auth) as AuthUser | null;
  const { data: meet, isLoading: isMeetLoading, refetch } = useMeetDetails(id);
  const { mutate: deleteMeet } = useDeleteMeet();
  const { data: participants } = useParticipants(meet?.participants);
  const { data: organizer } = useOrganizer(meet?.organizerId);

  const { mutate: userAttend } = useMutation({
    mutationFn: async ({
      user,
      meet,
    }: {
      user: USER_TYPES;
      meet: MeetType;
    }) => {
      const updatedUser = await updateUserProfile(user.uuid, {
        attendingMeets: [...(user.attendingMeets ?? []), meet.id],
      });
      const updatedMeet = await updateMeet(meet.id, {
        participants: [...(meet.participants ?? []), user.id],
      });
      return { updatedUser, updatedMeet };
    },
    onSuccess: (data) => {
      dispatch(storeUser(data.updatedUser));
      refetch();
    },
    onError: (error) => {
      console.error("Error attending meet", error);
    },
  });

  const handleAttend = () => {
    if (user && meet) {
      userAttend({ user, meet });
    }
  };

  const handleDeleteMeet = (meetId: string) => {
    deleteMeet(meetId);
  };

  const permissionToRemoveMeet = (auth: AuthUser, meet: MeetType) => {
    if (auth?.id === meet?.organizerId) {
      return true;
    }
    return false;
  };
  const totalParticipants = meet?.participants.length;

  const isMaxRidersReached =
    meet?.maxRiders === 0 ? false : meet?.maxRiders === totalParticipants;
  const isUserAttending = meet && user?.attendingMeets?.includes(meet?.id);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((prev) => !prev);
  };
  if (isMeetLoading) return <LoadingModal show={isMeetLoading} />;
  const handleEditMeet = () => {
    navigate(`/meet-config/${meet.id}`);
  };
  return (
    <>
      <div className="mt-4">
        <Card>
          <div className="flex gap-6">
            <img src={meet.image} alt={meet.name} className="max-w-[200px]" />
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-baseline">
                <h1 className="text-2xl font-bold mb-5">{meet.name}</h1>
                {auth && !permissionToRemoveMeet(auth, meet) && (
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
                {auth && permissionToRemoveMeet(auth, meet) && (
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
              <HostedByCard organizedBy={organizer} />
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-[2fr_1fr] gap-4 mt-4">
          <div>
            <MeetDetailsAbout title="Details" description={meet.description} />
            <Card className="px-6 mt-4">
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
            <Card className="px-6 mt-4">
              <div className="flex gap-9">
                <Counter label="total" count={totalParticipants} />
              </div>
              <Separator />
              <div className="overflow-auto">
                {meet &&
                  participants?.map((user) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      meet={meet}
                      updateUser={refetch}
                    />
                  ))}
              </div>
            </Card>
          </div>
          <div className="flex flex-col gap-3">
            <Card className="px-6 text-sm">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-5">
                    <img src={clock} alt="clock" />
                  </div>
                  <div className="flex gap-2">
                    <p>{getDate(meet.startDate)}</p>
                    <p>{meet.startTime}h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5">
                    <img src={location} alt="moto" />
                  </div>
                  <div>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      href={googleMapsPinLink(
                        meet.gps.latitude,
                        meet.gps.longitude
                      )}
                      className="flex items-center gap-2"
                    >
                      <p className="capitalize">{meet.address}</p>
                    </a>
                  </div>
                </div>

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
                    <img src={shield} alt="moto" />
                  </div>
                  <div>
                    <p className="capitalize">
                      Ride style:{" "}
                      <span className="text-white">{meet?.rideType}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-2">
              {meet.gps.latitude && (
                <div className="relative z-10">
                  <MyMap
                    long={meet.gps.longitude}
                    lat={meet.gps.latitude}
                    disableMarker
                  />
                </div>
              )}
            </Card>
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
