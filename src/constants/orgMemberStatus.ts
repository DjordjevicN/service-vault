export const ORG_MEMBER_STATUS = {
  MEMBER: 0,
  ADMIN: 1,
  MODERATOR: 2,
  ORG_PRESIDENT: 3,
};
export const ORG_MEMBER_STATUS_LABELS: Record<number, string> = {
  [ORG_MEMBER_STATUS.MEMBER]: "Member",
  [ORG_MEMBER_STATUS.ADMIN]: "Admin",
  [ORG_MEMBER_STATUS.MODERATOR]: "Moderator",
  [ORG_MEMBER_STATUS.ORG_PRESIDENT]: "Org President",
};
