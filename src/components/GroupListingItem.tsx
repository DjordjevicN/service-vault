import placeholder from "@/assets/placeholder.png";
import favoriteOn from "@/assets/favoriteOn.svg";
import favoriteOff from "@/assets/favoriteOff.svg";
import share from "@/assets/share.svg";

const GroupListingItem = ({ meet }) => {
  return (
    <div className="grid grid-cols-[1fr_2fr] mb-4 gap-4">
      <div>
        <img src={placeholder} alt="" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-gray55 uppercase text-sm">
            Wed, {meet.date}- 7:15 PM CEST
          </p>
          <p className="text-white">{meet.name}</p>
          <p className="text-gray55 text-sm">{meet.location}</p>
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
              {meet.favorite ? (
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
