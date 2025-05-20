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

import { storeUser } from "@/store/userSlice";
import {
  useMeetDetails,
  useOrganizer,
  useParticipants,
} from "@/hooks/useMeetQueries";

const MeetDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector(
    (state: RootState) => state.user
  ) as USER_TYPES | null;
  const auth = useSelector((state: RootState) => state.auth);
  const { data: meet, isLoading: isMeetLoading, refetch } = useMeetDetails(id);
  console.log("meet", meet);

  const { data: participants } = useParticipants(meet?.participants);
  const { data: organizer } = useOrganizer(meet?.organizerId);

  const { mutate: userAttend } = useMutation({
    mutationFn: async ({ user, meet }) => {
      console.log("User attending meet", user, meet);

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
  const addToCalendar = () => {
    console.log("Add to calendar clicked");
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
              <img src={clock} alt="clock" className="" />
              <div>
                <p className="text-white">{getDate(meet.startDate)}</p>
                <p className="text-white">{getTime(meet.startTime)}</p>
                <p
                  className="text-gray55 cursor-pointer text-gradient w-fit"
                  onClick={addToCalendar}
                >
                  Add to calendar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 ">
              <img src={location} alt="location" />
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
            <div>
              <p className="text-white text-xl capitalize">Rules:</p>
            </div>
            <div>
              <p className="text-gray55 capitalize">
                Max riders:
                <span className="text-white">{meet?.maxRiders}</span>
              </p>
            </div>
            <div>
              <p className="text-gray55 capitalize">
                Ride style: <span className="text-white">{meet?.rideType}</span>
              </p>
            </div>
          </div>
          <div className="w-full bg-gray80 rounded">
            <MyMap
              long={meet.gps.longitude}
              lat={meet.gps.latitude}
              disableMarker
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetDetails;
// const { data: meet, isLoading } = useQuery({
//   queryKey: ["meet", id],
//   queryFn: () => fetchMeetById(id),
//   enabled: !!id,
// });
// const { data: participants } = useQuery({
//   queryKey: ["users", meet?.participants],
//   queryFn: () => getAllUsersByIds(meet?.participants),
//   enabled: meet?.participants.length > 0,
// });

// const { data: organizer } = useQuery({
//   queryKey: ["organizer by id", organizerId],
//   queryFn: () => getUserById(organizerId),
//   enabled: !!organizerId,
// });
