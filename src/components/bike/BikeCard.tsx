import { Bike } from "@/types/bikeTypes";
import { useNavigate } from "react-router-dom";

type BikeCardProps = {
  bike: Bike;
  owner?: boolean;
};

const BikeCard: React.FC<BikeCardProps> = ({ bike, owner }) => {
  const navigate = useNavigate();
  const redirectToBikeDetails = () => {
    navigate(`/motorcycle/${bike.id}`);
  };

  return (
    <div
      className={`w-[300px] h-[120px] rounded cursor-pointer ${
        !owner && "opacity-50"
      }`}
      style={{
        backgroundImage: `url("${bike.image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={redirectToBikeDetails}
    >
      {bike.image === "" && (
        <div className="w-full h-full bg-gray-500 rounded flex items-center justify-center">
          <p>{bike.model}</p>
        </div>
      )}
    </div>
  );
};

export default BikeCard;
