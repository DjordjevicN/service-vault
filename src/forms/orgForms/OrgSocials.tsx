import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store";
import { updateOrgForm } from "@/store/orgFormSlice";

import { useDispatch, useSelector } from "react-redux";

const OrgSocials = () => {
  const dispatch = useDispatch();
  const orgForm = useSelector((state: RootState) => state.organizationForm);
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
      <Card className="p-6">
        <h2 className="text-gradient text-2xl w-fit">
          Organization Social Media
        </h2>
        <p className="text-gray55">
          Add the key details about your organization. Give it a name, define
          the style of the organization, set a rider limit if needed, and write
          a short description to let others know what to expect.
        </p>
      </Card>
      <Card className="p-6">
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            type="text"
            placeholder="Instagram URL"
            onChange={(e) =>
              dispatch(
                updateOrgForm({ key: "instagram", value: e.target.value })
              )
            }
            value={orgForm.instagram}
          />
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            type="text"
            placeholder="Twitter URL"
            onChange={(e) =>
              dispatch(updateOrgForm({ key: "twitter", value: e.target.value }))
            }
            value={orgForm.twitter}
          />
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            type="text"
            placeholder="Facebook URL"
            onChange={(e) =>
              dispatch(
                updateOrgForm({ key: "facebook", value: e.target.value })
              )
            }
            value={orgForm.facebook}
          />
          <Label htmlFor="tiktok">TikTok</Label>
          <Input
            id="tiktok"
            type="text"
            placeholder="TikTok URL"
            onChange={(e) =>
              dispatch(updateOrgForm({ key: "tiktok", value: e.target.value }))
            }
            value={orgForm.tiktok}
          />
          <Label htmlFor="youtube">YouTube</Label>
          <Input
            id="youtube"
            type="text"
            placeholder="YouTube URL"
            onChange={(e) =>
              dispatch(updateOrgForm({ key: "youtube", value: e.target.value }))
            }
            value={orgForm.youtube}
          />
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="text"
            placeholder="Website URL"
            onChange={(e) =>
              dispatch(
                updateOrgForm({ key: "customLink", value: e.target.value })
              )
            }
            value={orgForm.customLink}
          />
        </div>
      </Card>
    </div>
  );
};

export default OrgSocials;
