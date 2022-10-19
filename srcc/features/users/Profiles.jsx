import { useEffect } from "react";
import UsersList from "./UsersList";

const Profiles = () => {
    //const { users }  = useSelector((state) => state.user);

    useEffect(() => {    
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            <UsersList />
        </article>
    );
};

export default Profiles;