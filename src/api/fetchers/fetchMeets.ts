import { storeUserMeets } from "@/store/meetSlice";
import axios from "axios";

export const fetchMeets = async (ids: string[], dispatch: any) => {
  const res = await axios.post("http://localhost:3000/meets/meets", { ids });
  if (!res.data) throw new Error("No data found");
  dispatch(storeUserMeets(res.data));
  return res.data;
};
