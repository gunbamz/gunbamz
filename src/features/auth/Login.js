import { useState }from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import "./Login.css";

const Login = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [login, { isLoading }] = useLoginMutation();
    console.log(isLoading);
    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setFormData(x => ({
            ...x,
          [target.name]: value
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            const res = await login(formData).unwrap();
            dispatch(setCredentials(res));
            Navigate("/panel/newpatients", { replace: true });
          } catch (err) {
            console.log(err);
        } 
    };

    // useEffect(() => {
    //     dispatch(logOut()); 
    // }, [dispatch]);

    return (
        <div className="login__container">
            <div className="title">Login</div>
            <form onSubmit={handleLogin}>
                <div className="login__details">
                    <div className="input__box">
                        <span className="details">Email</span>
                        <input onChange={handleInputChange} value={formData.email ? formData.email : ""} name="email" type="email" placeholder="Enter email" required />
                    </div>
                    <div className="input__box">
                        <span className="details">Password</span>
                        <input onChange={handleInputChange} value={formData.password ? formData.password : ""} name="password" type="password" placeholder="Enter password" required />
                    </div>
                </div>
                <div className="button__wrapper">
                    <button className='button' type="submit">Login</button>
                </div>
            </form>
    </div>
    );
}

export default Login;
