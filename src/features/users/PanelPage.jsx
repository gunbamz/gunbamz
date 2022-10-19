import { useState } from "react";
import useWindow from "../../hooks/useWindow";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setMode } from "../../redux/modeRedux";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCertification } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import { DiMootoolsBadge } from "react-icons/di";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";


import profile from "../../assets/profile.jpg";
import "./PanelPage.css";

const PanelPage = () => {
    const [isClose, setClose] = useState(false);
    const dispatch = useDispatch();
    const { width } = useWindow();
    const handleChevronClick = () => {
        setClose(!isClose);
    }
    const modeHandler = (e) => {
        let temp = e.target.checked;
        dispatch(setMode(temp));
    };
    return (
        <div className="panel-wrapper">
           <nav className={(isClose || width < 450) ? "sidebar close" : "sidebar"}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={profile} alt="Load Failed" />
                        </span>
                        <div className="text logo-text">
                            <span className="profession">Muyiwa Ogunbameru</span>
                            <span className="logo-text-clip">muyiwaoluleye06@gmail.com</span>
                        </div>
                    </div>
                    <BiChevronRight onClick={handleChevronClick} className="toggle" />
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                 <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/about">
                                    <AiOutlineQuestionCircle className="icon" />
                                    <span className="text nav-text">About</span>
                                 </NavLink>
                            </li>
                             <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/qualifications">
                                    <BiCertification className="icon" />
                                    <span className="text nav-text">Qualifications</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/skills">
                                    <DiMootoolsBadge className="icon" />
                                    <span className="text nav-text">Skill</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/portfolio">
                                    <BiBriefcaseAlt2 className="icon" />
                                    <span className="text nav-text">Portfolio</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/contact">
                                    <BiUserCircle className="icon" />
                                    <span className="text nav-text">Contact</span>
                                 </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="lower-group">
                        <div className="mode-text text-low">Mode</div>
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