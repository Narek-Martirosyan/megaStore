import "./top.scss";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { dashboardMinimizer } from "../../features/configs/configsSlice";
import { changeFilteredCategories, changeFilteredProducts } from "../../features/products/productsSlice";

export const Top = () => {
    const [theme, setTheme] = useState("Փնտրել");
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const minimize = useSelector(dashboardMinimizer);

    useEffect(() => {
        if (pathname === "/dashboard/products") {
            setTheme("Փնտրել ապրանքներում");
        } else if (pathname === "/dashboard/categories") {
            setTheme("Փնտրել կատեգորիաներում");
        } else {
            setTheme("Փնտրել");
        }
    }, [pathname]);

    const searchHandler = (value) => {
        if (pathname === "/dashboard/products") {
            dispatch(changeFilteredProducts(value));
        } else if (pathname === "/dashboard/categories") {
            dispatch(changeFilteredCategories(value));
        }
    }

    return (
        <section className={minimize ? "top" : "top maximize"}>
            <div className="go-main-page">
                <Link to={"/"}>Գնալ գլխավոր էջ</Link>
            </div>

            <form className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder={theme}
                    title={theme}
                    onChange={(e) => searchHandler(e.target.value)}
                />
            </form>
        </section>
    )
}