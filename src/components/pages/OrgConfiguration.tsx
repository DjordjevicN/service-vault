import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchOrgById } from "@/supabase/orgFetchers";
import BasicOrgInformation from "@/forms/orgForms/BasicOrgInformation";
import LocationOrgInformation from "@/forms/orgForms/LocationOrgInformation";
import OrgSocials from "@/forms/orgForms/OrgSocials";
import { resetOrgForm, setEntireOrgForm } from "@/store/orgFormSlice";
import { useParams } from "react-router-dom";
import OrgMedia from "@/forms/orgForms/OrgMedia";
import OrgFormFinish from "@/forms/orgForms/OrgFormFinish";
import TopSteper from "../TopSteper";

const OrgConfiguration = () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const [section, setSection] = useState(0);

  const { data: organization } = useQuery({
    queryKey: ["organization", orgId],
    queryFn: () =>
      orgId
        ? fetchOrgById(Number(orgId), dispatch)
        : Promise.reject("Organization ID is undefined"),
    enabled: !!orgId,
  });

  const handleNext = () => {
    if (section === 4) {
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
  const stepLabels = ["Basic Info", "Location", "Socials", "Media", "Finish"];
  const maxSection = 4;
  return (
    <div>
      <TopSteper
        stepLabels={stepLabels}
        section={section}
        handleNext={handleNext}
        handleReset={handleReset}
        handlePrevious={handlePrevious}
        maxSection={maxSection}
        onStepClick={(step) => setSection(step)}
      />

      <div>
        {section === 0 && (
          <BasicOrgInformation
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        )}
        {section === 1 && (
          <LocationOrgInformation
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        )}
        {section === 2 && (
          <OrgSocials
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        )}

        {section === 3 && (
          <OrgMedia
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        )}

        {section === 4 && (
          <OrgFormFinish
            isUpdate={!!orgId}
            section={section}
            handleNext={handleNext}
            handleReset={handleReset}
            handlePrevious={handlePrevious}
            maxSection={maxSection}
          />
        )}
      </div>
    </div>
  );
};

export default OrgConfiguration;
