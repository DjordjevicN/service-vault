export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-orange90";
    case "confirmed":
      return "text-green90";
    case "locked":
      return "text-red90";
    case "cancelled":
      return "text-red90";
    case "ongoing":
      return "text-blue-400";
    case "running":
      return "text-blue-400";
    default:
      return "";
  }
};
