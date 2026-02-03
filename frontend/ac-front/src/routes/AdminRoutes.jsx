import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectionRoutes";
import AdminDashboard from "../admin/Dashboard/AdminDashborad";


const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/AdminDashboard"
        element={
          <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default AdminRoutes;

