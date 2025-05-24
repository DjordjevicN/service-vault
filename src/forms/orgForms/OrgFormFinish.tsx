import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IOrganization } from "@/constants/orgTypes";
import { RootState } from "@/store";
import { createOrg, updateOrg } from "@/supabase/orgFetchers";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrgFormFinish = ({ isUpdate }: { isUpdate: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orgForm = useSelector((state: RootState) => state.organizationForm);
  const user = useSelector((state: RootState) => state.user) as {
    id: string;
  } | null;

  const { mutate: createOrgMutation } = useMutation({
    mutationFn: (org: IOrganization) => createOrg(org),
    onSuccess: (data) => {
      if (!data) {
        console.error("No data returned from createOrg");
        return;
      }

      navigate(`/org/${data[0].id}`);
    },
    onError: (error) => {
      console.error("Error creating org:", error);
    },
  });
  const { mutate: updateOrgConfiguration } = useMutation({
    mutationFn: (updatedOrg: IOrganization) =>
      updateOrg(orgForm.id, updatedOrg),
    onSuccess: (data) => {
      console.log("Org updated successfully", data);
      if (!data) {
        console.error("No data returned from createOrg");
        return;
      }

      navigate(`/org/${orgForm.id}`);
    },
    onError: (error) => {
      console.error("Error creating org:", error);
    },
  });
  const handleSubmit = () => {
    if (isUpdate) {
      updateOrgConfiguration(orgForm);
      return;
    }
    if (!user) return;

    const newOrg = {
      ...orgForm,
      admin: Number(user.id),
    };
    createOrgMutation(newOrg);
    console.log("newOrg", newOrg);
  };
  return (
    <div>
      <Card className="px-6 mt-4">
        <div className="flex justify-between items-center">
          <h2 className=" w-fit">
            <span className="text-gradient">Final check</span> before publishing
          </h2>
          <Button className="div-gradient" onClick={handleSubmit}>
            Publish
          </Button>
        </div>
      </Card>
      <div className="grid grid-cols-[1fr_1fr] gap-4 mt-4">
        <Card>image name description</Card>
        <Card>address map country city</Card>
        <Card>contact email phone website</Card>
        <Card>members admin </Card>
      </div>
    </div>
  );
};

export default OrgFormFinish;
