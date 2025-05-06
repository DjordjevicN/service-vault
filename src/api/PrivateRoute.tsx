import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
