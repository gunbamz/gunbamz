import { Outlet, useNavigate, useLocation} from "react-router-dom";
import { useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import { useSelector } from "react-redux";

const PersistLogin = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const refresh =  useRefreshToken();
    const { auth }  = useSelector((state) => state.user);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const temp = await refresh();
                !temp &&  Navigate("/login", { replace: true, state: { from: location } });
            }
            catch (err) {
                console.log(err.response);
            }
        }
        !auth && verifyRefreshToken(); 

        return () => isMounted = false;
    }, [Navigate, auth, location, refresh]);
    useEffect(() => {
        console.log("persistlogin refresh");
    }, []);
 
    return (
        <>
          { auth && <Outlet /> }
        </>
    )
}

export  default PersistLogin