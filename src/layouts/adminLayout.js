import "./layoutesStyles.scss";
import { Outlet } from "react-router-dom";
import { Aside } from "../components/Aside";
import { Top } from "../components/Top";
import { useSelector } from "react-redux";
import { dashboardMinimizer } from "../features/configs/configsSlice";

export const AdminLayout = () => {
    const minimize = useSelector(dashboardMinimizer);

    return (
        <>
            <Aside />
            <Top />
            <div className={minimize ? "admin-outlet min" : "admin-outlet max"}>
                <Outlet />
            </div>
        </>
    )
}