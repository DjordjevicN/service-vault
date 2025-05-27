import moment from "moment";

export const getDate = (date: string) => {
  const humanReadable = moment(date).format("dddd, Do MMMM YYYY");
  return humanReadable;
};
export const getTime = (date: number) => {
  const humanReadableTime = moment(date).format("h:mm A");
  return humanReadableTime;
};
export const combineDateAndTime = (date: Date) => {
  return new Date(date);
};
