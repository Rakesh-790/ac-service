import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(StoreContext);

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
