import moment from "moment";

export const getDate = (date: number) => {
  const humanReadable = moment(date).format("dddd, Do MMMM YYYY");
  return humanReadable;
};
export const getTime = (date: number) => {
  const humanReadableTime = moment(date).format("h:mm A");
  return humanReadableTime;
};
