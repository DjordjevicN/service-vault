import placeholder from "@/assets/placeholder.png";
import { MeetType } from "@/constants/meetTypes";
import { useNavigate } from "react-router-dom";
import { USER_TYPES } from "@/constants/userTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { googleMapsPinLink } from "@/constants/helperFunctions";
import crown from "@/assets/crown-gold.svg";
import IconMoney from "./icons/IconMoney";
import IconGps from "./icons/IconGps";
import { getFormattedDate } from "./utils/getDates";
import { Country } from "country-state-city";

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

  return (
    <div
      className="flex mb-2 gap-4 cursor-pointer relative rounded-lg p-4 transition duration-200 bg-accent/30 hover:bg-accent/50 shadow-md hover:shadow-lg"
      onClick={() => handleNavigate(meet.id)}
    >
      {isMyMeet() && (
        <div className="absolute top-4 right-4">
          <img width={24} height={24} src={crown} alt="" />
        </div>
      )}

      <img
        src={meet.image || placeholder}
        alt="meet image"
        className="w-32 rounded-lg object-cover"
      />

      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="uppercase text-sm text-muted-foreground">
              {getFormattedDate(meet.startDate)}
            </p>
            <p className=" text-muted-foreground uppercase text-sm">
              {meet.startTime}
            </p>
          </div>
          <p className="text-xl capitalize">{meet.name}</p>
          <div className="flex items-center gap-2">
            <div className="w-6">
              <IconGps className="text-muted-foreground" />
            </div>
            <p className="text-white text-sm capitalize">
              {meet.address} {meet.city}{" "}
              {Country.getCountryByCode(meet.country)?.name}
            </p>
            {meet.gps.latitude && (
              <a
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                href={googleMapsPinLink(meet.gps.latitude, meet.gps.longitude)}
                className="w-fit ml-auto"
              >
                <p className="text-xs">
                  Show <span className="text-blue-400">GoogleMaps</span>
                </p>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 mt-1">
              <IconMoney className="text-muted-foreground mx-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Price: <span className="text-white">{meet.price || "FREE"}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray50">
            Attendees: {meet.participants.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupListingItem;
