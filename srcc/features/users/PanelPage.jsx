import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setMode } from "../../redux/modeRedux";
import { BiSearch } from "react-icons/bi";
import { FaClinicMedical } from "react-icons/fa";
import { BiVial } from "react-icons/bi";
import { BiBellPlus } from "react-icons/bi";
import { BiBook } from "react-icons/bi";
import { BiCreditCard } from "react-icons/bi";
import { BiFirstAid } from "react-icons/bi";
import { BiPieChartAlt2 } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import { BiBandAid } from "react-icons/bi";
import { BiPulse } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiHotel } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import "./PanelPage.css";

const PanelPage = () => {
    const [isClose, setClose] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const handleChevronClick = () => {
        setClose(!isClose);
    }
    const handleSearchClick = () => {
        setClose(!isClose);
    }
    const modeHandler = (e) => {
        let temp = e.target.checked;
        dispatch(setMode(temp));
    };
    return (
        <div className="panel-wrapper">
            <nav className={isClose ? "sidebar close" : "sidebar"}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="logo.png" alt="Image Load Failed" />
                        </span>
                        <div className="text logo-text">
                            <span className="name">Welcome!</span>
                            <span className="profession">Title Name</span>
                            <span className="logo-text-clip">{currentUser.email}</span>
                        </div>
                    </div>
                    <BiChevronRight onClick={handleChevronClick} className="toggle" />
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <li className="search-box">
                            <BiSearch onClick={handleSearchClick} className="icon" />
                            <input type="text" placeholder="Search..." />
                        </li>
                        <ul className="menu-links">
                            <li className="nav-link">
                                 <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/records">
                                    <BiBook className="icon" />
                                    <span className="text nav-text">Records</span>
                                 </NavLink>
                            </li>
                             <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/pharmacy">
                                    <BiBandAid className="icon" />
                                    <span className="text nav-text">Pharmacy</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                 <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/appointment">
                                    <BiBellPlus className="icon" />
                                    <span className="text nav-text">Appointment</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/clinics">
                                    <BiPulse className="icon" />
                                    <span className="text nav-text">Clinics</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                 <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/wards">
                                    <BiHotel className="icon" />
                                    <span className="text nav-text">Wards</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/theatre">
                                    <FaClinicMedical className="icon" />
                                    <span className="text nav-text">Theatre</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/laboratory">
                                    <BiVial className="icon" />
                                    <span className="text nav-text">Laboratory</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/store">
                                   <BiFirstAid className="icon" />
                                   <span className="text nav-text">Store</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                 <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/accounting">
                                    <BiCreditCard className="icon" />
                                    <span className="text nav-text">Accounting</span>
                                 </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/analytics">
                                   <BiPieChartAlt2 className="icon" />
                                   <span className="text nav-text">Analytics</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/profiles">
                                  <BiUser className="icon" />
                                  <span className="text nav-text">Profiles</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="bottom-content">
                        <li className="nav-link">
                            <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/logout">
                                <BiLogOutCircle className="icon" />  
                                <span className="text nav-text">Logout</span>
                            </NavLink>
                        </li>
                        <li className="mode">
                            <div className="sun-moon">
                                <i className="bx bx-moon icon moon"></i>
                                <i className="bx bx-sun icon sun"></i>
                            </div>
                            <span className="mode-text text">Dark mode</span>

                            <label className="toggle-switch">
                               <input type="checkbox" name="toggle" onClick={modeHandler} />
                               <span className="switch"></span>
                            </label>
                        </li>
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
// <div className="text">Dashboard Sidebar</div>