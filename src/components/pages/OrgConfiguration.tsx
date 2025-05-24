import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import StepController from "../StepController";
import { useQuery } from "@tanstack/react-query";
import { fetchOrgById } from "@/supabase/orgFetchers";
import BasicOrgInformation from "@/forms/orgForms/BasicOrgInformation";
import LocationOrgInformation from "@/forms/orgForms/LocationOrgInformation";
import OrgMembers from "@/forms/orgForms/OrgMembers";
import OrgSocials from "@/forms/orgForms/OrgSocials";
import { resetOrgForm, setEntireOrgForm } from "@/store/orgFormSlice";
import { useParams } from "react-router-dom";
import OrgMedia from "@/forms/orgForms/OrgMedia";
import OrgFormFinish from "@/forms/orgForms/OrgFormFinish";

const OrgConfiguration = () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const [section, setSection] = useState(5);

  const { data: organization } = useQuery({
    queryKey: ["organization", orgId],
    queryFn: () =>
      orgId
        ? fetchOrgById(orgId)
        : Promise.reject("Organization ID is undefined"),
    enabled: !!orgId,
  });

  const handleNext = () => {
    if (section === 5) {
      return;
    }
    setSection((prev) => prev + 1);
  };
  const handlePrevious = () => {
    if (section === 0) {
      return;
    }
    setSection((prev) => prev - 1);
  };

  const handleReset = () => {
    dispatch(resetOrgForm());
    setSection(0);
  };

  useEffect(() => {
    if (!orgId) return;
    dispatch(setEntireOrgForm(organization));
  }, [orgId, dispatch, organization]);

  return (
    <div>
      <div>
        {section === 0 && <BasicOrgInformation />}
        {section === 1 && <LocationOrgInformation />}
        {section === 2 && <OrgSocials />}
        {section === 3 && <OrgMedia />}
        {section === 4 && <OrgMembers />}
        {section === 5 && <OrgFormFinish isUpdate={!!orgId} />}
      </div>
      <StepController
        section={section}
        handleNext={handleNext}
        handleReset={handleReset}
        handlePrevious={handlePrevious}
      />
    </div>
  );
};

export default OrgConfiguration;
