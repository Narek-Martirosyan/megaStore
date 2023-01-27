import "./aside.scss";
import logo from "../../img/logo.png";
import { NavLink } from "react-router-dom";
import { FaAngleRight, FaQuestionCircle, FaShoppingCart, FaBox } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeMinimize, dashboardMinimizer } from "../../features/configs/configsSlice";

export const Aside = () => {
    const dispatch = useDispatch();
    const minimize = useSelector(dashboardMinimizer);

    return (
        <aside className={minimize ? "minimize" : "maximize"}>
            <div className="arrow-box" onClick={() => dispatch(changeMinimize(!minimize))}>
                <FaAngleRight className={minimize ? "angle right" : "angle left"} />
            </div>

            <div className="logo-box">
                <img src={logo} alt="logo" className={minimize ? "show" : "hide"} />
            </div>

            <ul className="content-box">
                <li>
                    <NavLink to="/dashboard" end>
                        <FaQuestionCircle className="icons" />
                        <span className={minimize ? "show" : "hide"}>Օգնություն</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/products" end>
                        <FaShoppingCart className="icons" />
                        <span className={minimize ? "show" : "hide"}>Ապրանքներ</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/categories" end>
                        <FaBox className="icons" />
                        <span className={minimize ? "show" : "hide"}>Կատեգորիաներ</span>
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}