import placeholder from "@/assets/placeholder.png";
import favoriteOn from "@/assets/favoriteOn.svg";
import favoriteOff from "@/assets/favoriteOff.svg";
import share from "@/assets/share.svg";
import { MeetType } from "@/constants/meetTypes";
import gps from "@/assets/gps.svg";
import { useNavigate } from "react-router-dom";
import { USER_TYPES } from "@/constants/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { googleMapsPinLink } from "@/constants/helperFunctions";
import crown from "@/assets/crown-gold.svg";
import { getDate } from "./utils/getDates";
import { Card } from "./ui/card";
import RMHoverCard from "./RMHoverCard";

const GroupListingItem = ({ meet }: { meet: MeetType }) => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );

  const isMyMeet = () => {
    return user?.uuid === meet.organizerId;
  };
  if (!meet || !user) return null;

  const handleNavigate = (id: number) => {
    navigate(`/meet/${id}`);
  };

  const isUsersFavorite = () => {
    return user.favoriteMeets?.includes(meet.id);
  };

  return (
    <Card
      className="grid grid-cols-[1fr_2fr] mb-4 gap-4 cursor-pointer relative rounded-lg p-4 transition duration-200"
      onClick={() => handleNavigate(meet.id)}
    >
      {isMyMeet() && (
        <div className="absolute top-4 right-4">
          <img width={24} height={24} src={crown} alt="" />
        </div>
      )}
      <div>
        <img src={placeholder} alt="meet image" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-white uppercase text-sm">
              {getDate(meet.startDate)}
            </p>
            <p className="text-white uppercase text-sm">{meet.startTime}</p>
          </div>
          <p className="text-muted-foreground text-2xl capitalize">
            {meet.name}
          </p>
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            href={googleMapsPinLink(meet.gps.latitude, meet.gps.longitude)}
            className="flex items-center gap-2 mt-2"
          >
            <img src={gps} alt="" />
            <p className="text-white text-sm capitalize">
              {meet.address} {meet.city}, {meet.country}
            </p>
          </a>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray50">
            Attendees: {meet.participants.length}
          </p>
          <div className="flex gap-4 ">
            <RMHoverCard copy={`http://localhost:5173/meet/${meet.id}`}>
              <img src={share} alt="share" />
            </RMHoverCard>

            <div className="cursor-pointer" onClick={() => console.log("fav")}>
              {isUsersFavorite() ? (
                <img src={favoriteOn} alt="favorite on" />
              ) : (
                <img src={favoriteOff} alt="favorite off" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GroupListingItem;
