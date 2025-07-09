import moment from "moment";

export const formatToMonthYear = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const getDate = (date: string) => {
  const humanReadable = moment(date).format("YYYY-MM-DD");
  return humanReadable;
};
export const getTime = (date: number) => {
  const humanReadableTime = moment(date).format("h:mm A");
  return humanReadableTime;
};
export const combineDateAndTime = (date: Date) => {
  return new Date(date);
};

export const getFormattedDate = (date: string) => {
  const formattedDate = moment(date).format("DD MM YYYY");
  return formattedDate;
};
