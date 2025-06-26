import { IMember, IOrganization } from "@/constants/orgTypes";
import { supabase } from "@/lib/supabase";
import { storeOrg } from "@/store/orgSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const getAllOrgs = async () => {
  const { data: orgs, error } = await supabase.from("organization").select("*");
  if (error) {
    console.error("Error fetching organization:", error);
    return [];
  }
  if (!orgs) {
    console.error("No organizations found");
    return [];
  }

  return orgs;
};

export const getAllOrgByUserId = async (id: number) => {
  const { data: orgs, error } = await supabase
    .from("organization")
    .select("*")
    .in("admin", [id]);
  if (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
  if (!orgs) {
    console.error("No organizations found");
    return [];
  }

  return orgs;
};

export const getAllOrgsByIds = async (orgIds: number[], dispatch: Dispatch) => {
  const { data: orgs, error } = await supabase
    .from("organization")
    .select("*")
    .in("id", orgIds);
  if (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
  if (!orgs) {
    console.error("No organizations found");
    return [];
  }
  dispatch(storeOrg(orgs));
  return orgs;
};

// create new org
export const createOrg = async (org: IOrganization) => {
  const { data, error } = await supabase
    .from("organization")
    .insert([org])
    .select();
  if (error) {
    console.error("Error creating organization:", error);
    return null;
  }

  return data;
};
// get organization by id
export const fetchOrgById = async (id: number, dispatch: Dispatch) => {
  const { data, error } = await supabase
    .from("organization")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching organization by id:", error);
    return null;
  }
  dispatch(storeOrg(data));
  return data;
};

export const getOrgsByTheCountry = async (country: string) => {
  const { data, error } = await supabase
    .from("organization")
    .select("*")
    .eq("country", country);
  if (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
  if (!data) {
    console.error("No organizations found");
    return [];
  }

  return data;
};
// update organization
export const updateOrg = async (id: number, updates: object) => {
  const { data, error } = await supabase
    .from("organization")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Error updating organization:", error);
    return null;
  }

  return data;
};

export const deleteOrg = async (id: number) => {
  // 1. Remove the organization
  const { error: deleteError } = await supabase
    .from("organization")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting organization:", deleteError);
    return null;
  }

  // 2. Get all users attending this organization
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("id, attendingOrgs");

  if (usersError) {
    console.error("Error fetching profiles:", usersError);
    return null;
  }

  // 3. Filter and update users who are attending the deleted organization
  const affectedUsers = users.filter((user) =>
    user.attendingOrgs?.includes(id)
  );

  for (const user of affectedUsers) {
    const updatedOrgs = user.attendingOrgs.filter(
      (orgId: string) => Number(orgId) !== id
    );

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ attendingOrgs: updatedOrgs })
      .eq("id", user.id);

    if (updateError) {
      console.error(`Error updating user ${user.id}:`, updateError);
      // continue updating others instead of returning
    }
  }

  return { success: true };
};
export const getAllOrganizationByMemberId = async (memberId: number) => {
  const { data: orgs, error } = await supabase
    .from("organization")
    .select("*")
    .contains("members", [memberId]);
  if (error) {
    console.error("Error fetching organizations by member id:", error);
    return [];
  }
  if (!orgs) {
    console.error("No organizations found for this member");
    return [];
  }

  return orgs;
};

export const getOrgMembers = async (orgId: number) => {
  const { data: members, error } = await supabase
    .from("members")
    .select("*")
    .eq("orgId", orgId);
  if (error) {
    console.error("Error fetching organization members:", error);
    return [];
  }
  if (!members) {
    console.error("No members found for this organization");
    return [];
  }

  return members;
};
export const updateMembersStatus = async (memberId: number, status: number) => {
  const { data, error } = await supabase
    .from("members")
    .update({ status })
    .eq("id", memberId)
    .select();

  if (error) {
    console.error("Error updating member status:", error);
    return null;
  }

  return data;
};
export const createNewMember = async (member: IMember) => {
  const { data, error } = await supabase
    .from("members")
    .insert([member])
    .select();

  if (error) {
    console.error("Error creating new member:", error);
    return null;
  }

  return data;
};
export const removeMember = async (memberId: number) => {
  console.log("Removing member with ID:", memberId);

  const { data, error } = await supabase
    .from("members")
    .delete()
    .eq("userId", memberId)
    .select();

  if (error) {
    console.error("Error removing member from organization:", error);
    return null;
  }

  return data;
};
