import MyMap from "@/components/map/MyMap";
import Input from "@/components/UI/Input";

import { useState } from "react";

const LocationSection = () => {
  const [startLocation, setStartLocation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(44.7866);
  const [longitude, setLongitude] = useState(20.4489);

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
          lat={latitude}
          long={longitude}
          onChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />
        <Input
          onChange={(value) => setStartLocation(String(value))}
          value={startLocation}
          label="Location"
          placeholder="Enter the location"
          description="Explain closely where the meet will be held"
        />
        <Input
          onChange={(value) => setAddress(String(value))}
          value={address}
          label="Address"
          placeholder="Enter the address"
        />
        <Input
          onChange={(value) => setCity(String(value))}
          value={city}
          label="City"
          placeholder="Enter the city"
        />
        <Input
          onChange={(value) => setCountry(String(value))}
          value={country}
          label="Country"
          placeholder="Enter the country"
        />
      </div>
    </div>
  );
};

export default LocationSection;
