import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMeetForm } from "@/store/meetFormSlice";

import MyMap from "@/components/map/MyMap";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CountrySelect } from "@/components/CountrySelect";

const LocationSection = () => {
  const dispatch = useDispatch();
  const { startLocation, address, city, country, gps } = useSelector(
    (state: RootState) => state.meetForm
  );

  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-2">
      <Card className="px-6">
        <div>
          <h2 className="">
            Meet <span className="text-gradient">Location</span>
          </h2>
          <p className="text-gray55 mt-6">
            Set the exact meetup point for the ride. Use the map to drop a pin,
            then fill in the location details to help riders easily find the
            starting point.
          </p>
        </div>
      </Card>
      <div className="">
        <Card className="px-4 py-4 mb-4">
          <MyMap
            lat={gps?.latitude || 44.7866}
            long={gps?.longitude || 20.4489}
            onChange={(lat, lng) => {
              dispatch(
                updateMeetForm({
                  key: "gps",
                  value: { latitude: lat, longitude: lng },
                })
              );
            }}
          />
        </Card>
        <Card className="px-6">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              onChange={(e) =>
                dispatch(
                  updateMeetForm({
                    key: "startLocation",
                    value: e.target.value.toLowerCase(),
                  })
                )
              }
              value={startLocation}
              id="location"
              placeholder="Enter the location"
            />
            <Label htmlFor="Address">Address</Label>
            <Input
              onChange={(e) =>
                dispatch(
                  updateMeetForm({
                    key: "address",
                    value: e.target.value.toLowerCase(),
                  })
                )
              }
              value={address}
              id="Address"
              placeholder="Enter the address"
            />
            <Label htmlFor="City">City</Label>
            <Input
              onChange={(e) =>
                dispatch(
                  updateMeetForm({
                    key: "city",
                    value: e.target.value.toLowerCase(),
                  })
                )
              }
              value={city}
              id="City"
              placeholder="Enter the city"
            />
            <div className="space-y-1">
              <CountrySelect
                onSelect={(code) =>
                  dispatch(
                    updateMeetForm({
                      key: "country",
                      value: code,
                    })
                  )
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocationSection;
