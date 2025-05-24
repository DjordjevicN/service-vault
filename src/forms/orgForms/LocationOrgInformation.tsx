import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import MyMap from "@/components/map/MyMap";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { updateOrgForm } from "@/store/orgFormSlice";

const LocationOrgInformation = () => {
  const { address, city, country, gps } = useSelector(
    (state: RootState) => state.organizationForm
  );
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
      <Card className="px-6">
        <div>
          <h2 className="">
            Organization <span className="text-gradient">Location</span>
          </h2>
          <p className="text-gray55 mt-6">
            Set the exact location for the organization. Use the map to drop a
            pin, then fill in the location details to help members easily find
            the starting point.
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
                updateOrgForm({
                  key: "gps",
                  value: { latitude: lat, longitude: lng },
                })
              );
            }}
          />
        </Card>
        <Card className="px-6">
          <div>
            <Label htmlFor="Address">Address</Label>
            <Input
              onChange={(e) =>
                dispatch(
                  updateOrgForm({ key: "address", value: e.target.value })
                )
              }
              value={address}
              id="Address"
              placeholder="Enter the address"
            />
            <Label htmlFor="City">City</Label>
            <Input
              onChange={(e) =>
                dispatch(updateOrgForm({ key: "city", value: e.target.value }))
              }
              value={city}
              id="City"
              placeholder="Enter the city"
            />
            <Label htmlFor="Country">Country</Label>
            <Input
              onChange={(e) =>
                dispatch(
                  updateOrgForm({ key: "country", value: e.target.value })
                )
              }
              value={country}
              id="Country"
              placeholder="Enter the country"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocationOrgInformation;
