import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMeetForm } from "@/store/formsSlice";

import MyMap from "@/components/map/MyMap";
import Input from "@/components/UI/Input";

const LocationSection = () => {
  const dispatch = useDispatch();
  const { startLocation, address, city, country, location } = useSelector(
    (state: RootState) => state.meetForm
  );

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4">
      <div>
        <h2 className="text-white text-2xl">
          Meet <span className="text-gradient">Location</span>
        </h2>
        <p className="text-gray55 mt-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ea?
          Accusantium, deleniti dolorum? Officiis fugit dolores at placeat ab
          nesciunt!
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <MyMap
          lat={location.latitude || 44.7866}
          long={location.longitude || 20.4489}
          onChange={(lat, lng) => {
            dispatch(
              updateMeetForm({
                key: "location",
                value: { latitude: lat, longitude: lng },
              })
            );
          }}
        />
        <Input
          onChange={(value) =>
            dispatch(updateMeetForm({ key: "startLocation", value }))
          }
          value={startLocation}
          label="Location"
          placeholder="Enter the location"
          description="Explain closely where the meet will be held"
        />
        <Input
          onChange={(value) =>
            dispatch(updateMeetForm({ key: "address", value }))
          }
          value={address}
          label="Address"
          placeholder="Enter the address"
        />
        <Input
          onChange={(value) => dispatch(updateMeetForm({ key: "city", value }))}
          value={city}
          label="City"
          placeholder="Enter the city"
        />
        <Input
          onChange={(value) =>
            dispatch(updateMeetForm({ key: "country", value }))
          }
          value={country}
          label="Country"
          placeholder="Enter the country"
        />
      </div>
    </div>
  );
};

export default LocationSection;
