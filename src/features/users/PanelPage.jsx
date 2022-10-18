import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setMode } from "../../redux/modeRedux";
import profile from "../../assets/profile.jpg";
import "./PanelPage.css";

const PanelPage = () => {
    const dispatch = useDispatch();
    const modeHandler = (e) => {
        let temp = e.target.checked;
        dispatch(setMode(temp));
    };
    return (
        <div className="panel-wrapper">
            <nav className="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={profile} alt="" />
                        </span>
                        <div className="text logo-text">
                            <span className="profession">Muyiwa Ogunbameru</span>
                            <span className="logo-text-clip">muyiwaoluleye06@gmail.com</span>
                        </div>
                    </div>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                 <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/about">
                                    <span className="text nav-text">About</span>
                                 </NavLink>
                            </li>
                             <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/qualifications">
                                    <span className="text nav-text">Qualifications</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/skills">
                                    <span className="text nav-text">Skill</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/portfolio">
                                    <span className="text nav-text">Portfolio</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/contact">
                                    <span className="text nav-text">Contact</span>
                                 </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="lower-group">
                        <span className="mode-text text">Mode</span>
                        <label className="toggle-switch">
                            <input type="checkbox" name="toggle" onClick={modeHandler} />
                            <span className="switch"></span>
                        </label>
                    </div>
                </div>
            </nav>
            <section className="home">
                <Outlet />
            </section>
        </div>
    )
}
export default PanelPage;