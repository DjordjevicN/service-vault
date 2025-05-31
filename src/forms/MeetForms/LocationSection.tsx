import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateMeetForm } from "@/store/meetFormSlice";

import MyMap from "@/components/map/MyMap";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CountrySelect } from "@/components/CountrySelect";
import { useUserLocation } from "@/hooks/useUserLocation";
import StepController from "@/components/StepController";

const LocationSection = ({
  section,
  handleReset,
  handlePrevious,
  handleNext,
  maxSection,
}: {
  section: number;
  handleReset: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  maxSection: number;
}) => {
  const dispatch = useDispatch();
  const { startLocation, address, city, gps } = useSelector(
    (state: RootState) => state.meetForm
  );
  const location = useUserLocation();

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
            lat={gps?.latitude || location?.latitude}
            long={gps?.longitude || location?.longitude}
            onChange={(lat, lng) => {
              dispatch(
                updateMeetForm({
                  key: "gps",
                  value: { latitude: lat, longitude: lng },
                })
              );
            }}
          />
          <p className="text-muted-foreground">
            Pin the location on the map, so users can set the google maps
            location accurately.<span className="text-red-500 ml-2">*</span>
          </p>
        </Card>
        <Card className="px-6">
          <div>
            <Label htmlFor="location">Location </Label>
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
              placeholder="Describe the location eg. Park, Mall, etc."
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
          <div className="ml-auto">
            <StepController
              section={section}
              handleNext={handleNext}
              handleReset={handleReset}
              handlePrevious={handlePrevious}
              maxSection={maxSection}
              disableNext={!gps.latitude || !gps.longitude}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocationSection;
