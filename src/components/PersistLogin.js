import { Outlet, Navigate, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

const PersistLogin = () => {
    const location = useLocation();
    const { token }  = useSelector((state) => state.auth);

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default PersistLogin;