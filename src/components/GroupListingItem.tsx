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
import money from "@/assets/money.svg";

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
            <p className="uppercase text-sm text-muted-foreground">
              {getDate(meet.startDate)}
            </p>
            <p className=" text-muted-foreground uppercase text-sm">
              {meet.startTime}
            </p>
          </div>
          <p className="text-xl capitalize">{meet.name}</p>
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            href={googleMapsPinLink(meet.gps.latitude, meet.gps.longitude)}
            className="flex items-center gap-2 mt-2"
          >
            {" "}
            <div className="w-6">
              <img src={gps} alt="" />
            </div>
            <p className="text-white text-sm capitalize">
              {meet.address} {meet.city}, {meet.country}
            </p>
          </a>

          <div className="flex items-center gap-2">
            <div className="w-6">
              <img src={money} alt="" />
            </div>
            <p className="text-sm">
              Price: <span>{meet.price || "FREE"}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray50">
            Attendees: {meet.participants.length}
          </p>
          <div className="flex gap-4 ">
            <img src={share} alt="share" />
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
