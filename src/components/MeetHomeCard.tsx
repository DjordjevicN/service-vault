import placeholder from "@/assets/placeholder.png";
import { useNavigate } from "react-router-dom";

const MeetHomeCard = ({ meetDetails }) => {
  const navigate = useNavigate();

  const navigateToMeetDetails = (id: string) => {
    console.log("meet id", id);

    return navigate(`/meet/${id}`);
  };

  return (
    <div
      className="w-[285px] cursor-pointer"
      onClick={() => {
        navigateToMeetDetails(meetDetails.id);
      }}
    >
      <img src={placeholder} alt="meet image" />
      <h2 className="text-xl mt-2 text-white">{meetDetails.name}</h2>
      <p className="text-sm text-gray55 mt-2">Sava centar, Beograd</p>
      <p className="text-sm text-gray55 mt-1">Mon, May 5 6:00PM CEST</p>
    </div>
  );
};

export default MeetHomeCard;
