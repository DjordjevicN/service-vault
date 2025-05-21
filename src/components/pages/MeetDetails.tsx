import UserRow from "./UserRow";
import HostedByCard from "../HostedByCard";
import clock from "../../assets/clock.svg";
import location from "../../assets/gps.svg";
import MeetDetailsAbout from "../MeetDetailsAbout";
import Counter from "../Counter";
import Button from "../UI/Button";
import { useParams } from "react-router-dom";
import DivideLine from "../UI/DivideLine";
import { useMutation } from "@tanstack/react-query";
import LoadingModal from "../LoadingModal";
import { getDate, getTime } from "../utils/getDates";
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

const MeetDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const auth = useSelector((state: RootState) => state.auth);
  const { data: meet, isLoading: isMeetLoading, refetch } = useMeetDetails(id);
  console.log("meet", meet);
  const { mutate: deleteMeet } = useDeleteMeet();
  const { data: participants } = useParticipants(meet?.participants);
  const { data: organizer } = useOrganizer(meet?.organizerId);
  console.log("org", organizer);

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

  const permissionToRemoveMeet = (auth: any, meet: MeetType) => {
    if (auth?.id === meet?.organizerId) {
      return true;
    }

    return false;
  };
  const totalParticipants = meet?.participants.length;

  const isMaxRidersReached =
    meet?.maxRiders === 0 ? false : meet?.maxRiders === totalParticipants;
  const isUserAttending = meet && user?.attendingMeets?.includes(meet?.id);
  if (isMeetLoading) return <LoadingModal show={isMeetLoading} />;
  return (
    <div className="p-6 ">
      <div className="flex justify-between items-baseline">
        <h1 className="text-4xl mb-15 text-white">{meet.name}</h1>
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
      </div>

      <HostedByCard organizedBy={organizer} />
      <DivideLine className="mt-6" />
      <div className="grid grid-cols-[2fr_1fr] gap-4 mt-14">
        <div>
          <MeetDetailsAbout title="Details" description={meet.description} />
          <div>
            <p className="text-white text-xl capitalize mt-14">Rules:</p>
            {meet.rules.map((rule: string, index: number) => {
              return (
                <div key={index} className="text-gray55 text-base mt-2">
                  <p className="text-white">{rule}</p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-9 mt-10">
            <Counter label="total" count={totalParticipants} />
          </div>
          <div className="h-96 overflow-auto mt-6">
            {meet &&
              participants &&
              participants.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  meet={meet}
                  updateUser={refetch}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full bg-gray80 p-6 rounded flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-5">
                <img src={clock} alt="clock" className="" />
              </div>
              <div>
                <p className="text-white">{getDate(meet.startDate)}</p>
                <p className="text-white">{getTime(meet.startTime)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
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
                  <p className="text-gray55">{meet.address}</p>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 ">
              <div className="w-5">
                <img src={moto} alt="moto" />
              </div>
              <div>
                <p className="text-gray55 capitalize">
                  Max riders:
                  <span className="text-white">{meet?.maxRiders}</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <div className="w-5">
                <img src={shield} alt="moto" />
              </div>
              <div>
                <p className="text-gray55 capitalize">
                  Ride style:
                  <span className="text-white">{meet?.rideType}</span>
                </p>
              </div>
            </div>
          </div>
          {meet.gps.latitude && (
            <div className="w-full bg-gray80 rounded">
              <MyMap
                long={meet.gps.longitude}
                lat={meet.gps.latitude}
                disableMarker
              />
            </div>
          )}
        </div>
      </div>
      {permissionToRemoveMeet(auth, meet) && (
        <div className="flex gap-4">
          <Button
            wrapperClassName="text-green-500"
            variant="text"
            onClick={() => {
              console.log("Edit");
            }}
          >
            Edit
          </Button>
          <Button
            wrapperClassName="text-red-500"
            variant="text"
            onClick={() => handleDeleteMeet(meet.id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default MeetDetails;
