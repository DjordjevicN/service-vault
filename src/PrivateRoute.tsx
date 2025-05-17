import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
