import { refreshRequest } from '../requestMethods';
import { apiRefreshSuccess } from "../redux/userRedux";
import { useDispatch } from "react-redux";
  
const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            const res = await refreshRequest.get('/auth/refresh');
            dispatch(apiRefreshSuccess(res.data));
            return res.data.accessToken;
        }
        catch (err) {
            if (err.response.status === 401) {
                console.log("use refresh error ran");
            }
        }
    }
    return refresh;
};

export default useRefreshToken;
