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

const GroupListingItem = ({ meet }: { meet: MeetType }) => {
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.user as USER_TYPES | null
  );

  const isMyMeet = () => {
    return user?.uuid === meet.organizerId;
  };
  if (!meet || !user) return null;

  const handleNavigate = (id: string) => {
    navigate(`/meet/${id}`);
  };

  const isUsersFavorite = () => {
    return user.favoriteMeets?.includes(meet.id);
  };

  return (
    <div
      className="grid grid-cols-[1fr_2fr] mb-4 gap-4 cursor-pointer relative"
      onClick={() => handleNavigate(meet.id)}
    >
      {isMyMeet() && (
        <div className="absolute top-0 right-0">
          <img width={24} height={24} src={crown} alt="" />
        </div>
      )}
      <div>
        <img src={placeholder} alt="" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-gray55 uppercase text-sm">{meet.startTime}</p>
          <p className="text-white">{meet.name}</p>
          <a
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            href={googleMapsPinLink(meet.gps.latitude, meet.gps.longitude)}
            className="flex items-center gap-2 mt-2"
          >
            <img src={gps} alt="" />
            <p className="text-gray55 text-sm">
              {meet.address} {meet.city}, {meet.country}
            </p>
          </a>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray55">
            {meet.participants.length} attendees
          </p>
          <div className="flex gap-4 ">
            <div
              className="cursor-pointer"
              onClick={() => console.log("share")}
            >
              <img src={share} alt="share" />
            </div>
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
    </div>
  );
};

export default GroupListingItem;
