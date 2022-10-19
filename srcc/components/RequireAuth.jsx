import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";  

const RequireAuth = ({ allowedRoles }) => {
    const { currentUser } = useSelector((state) => state.auth);

    let isRole = currentUser?.roles?.some(x => allowedRoles?.includes(x));
   

    return (
      isRole
      ? <Outlet />
      : <Navigate to="/unauthorized" replace />
    )
}
export default RequireAuth;
//user?.role?.find(x => allowedRoles?.includes(x))