import "./mobile.scss";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categoriesProvider } from "../../../features/products/productsSlice";

export const Mobile = () => {
    const categories = useSelector(categoriesProvider);
    const [active, setActive] = useState({
        realty: false,
        transport: false,
        electronics: false,
        other: false
    });
    const [openMobile, setOpenMobile] = useState(false);
    const { pathname } = useLocation();
    const catID = {};

    categories.forEach(category => {
        catID[category.title.replace(/ +/g, "")] = category.id;
    });

    const openSubMenuHandler = (id) => {
        active[id] = !active[id];

        for (let i in active) {
            if (i !== id) {
                active[i] = false;
            }
        }

        setActive({ ...active });
    }

    useEffect(() => {
        setOpenMobile(false);
    }, [pathname]);

    return (
        <div className="mobile-burger">
            <div className="bg-burger" onClick={() => setOpenMobile(!openMobile)}>
                {openMobile ? <FaTimes className="burger" /> : <FaBars className="burger" />}

            </div>
            <ul className={openMobile ? "mobile-navigation-bar active" : "mobile-navigation-bar"}>

                <li>
                    <Link to={"/"}>Գլխավոր</Link>
                </li>

                <li>
                    <span id="realty" onClick={(e) => openSubMenuHandler(e.target.id)}>
                        Անշարժ գույք
                        <FaAngleDown className={active.realty ? "mobile-angle-down active" : "mobile-angle-down"} />
                    </span>
                    <ul className={active.realty ? "mobile-dropdown-nav active" : "mobile-dropdown-nav"}>
                        <li><Link to={`/categories/${catID.Անշարժգույք}`}>Բոլորը</Link></li>
                        <li><Link to={`/categories/${catID.Բնակարաններ}`}>Բնակարաններ</Link></li>
                        <li><Link to={`/categories/${catID.Տներ}`}>Տներ</Link></li>
                        <li><Link to={`/categories/${catID.Ավտոտնակներ}`}>Ավտոտնակներ</Link></li>
                    </ul>
                </li>

                <li>
                    <span id="transport" onClick={(e) => openSubMenuHandler(e.target.id)}>
                        Տրանսպորտ
                        <FaAngleDown className={active.transport ? "mobile-angle-down active" : "mobile-angle-down"} />
                    </span>
                    <ul className={active.transport ? "mobile-dropdown-nav active" : "mobile-dropdown-nav"}>
                        <li><Link to={`/categories/${catID.Տրանսպորտ}`}>Բոլորը</Link></li>
                        <li><Link to={`/categories/${catID.Ավտոմեքենաներ}`}>Ավտոմեքենաներ</Link></li>
                        <li><Link to={`/categories/${catID.Բեռնատարներ}`}>Բեռնատարներ</Link></li>
                        <li><Link to={`/categories/${catID.Պահեստամասեր}`}>Պահեստամասեր</Link></li>
                        <li><Link to={`/categories/${catID.Հեծանիվներ}`}>Հեծանիվներ</Link></li>
                    </ul>
                </li>

                <li>
                    <span id="electronics" onClick={(e) => openSubMenuHandler(e.target.id)}>
                        Էլեկտրոնիկա
                        <FaAngleDown className={active.electronics ? "mobile-angle-down active" : "mobile-angle-down"} />
                    </span>
                    <ul className={active.electronics ? "mobile-dropdown-nav active" : "mobile-dropdown-nav"}>
                        <li><Link to={`/categories/${catID.Էլեկտրոնիկա}`}>Բոլորը</Link></li>
                        <li><Link to={`/categories/${catID.Բջջայինհեռախոսներ}`}>Բջջային հեռախոսներ</Link></li>
                        <li><Link to={`/categories/${catID.Նոութբուքեր}`}>Նոութբուքեր</Link></li>
                        <li><Link to={`/categories/${catID.Հեռուստացույց}`}>Հեռուստացույցեր</Link></li>
                    </ul>
                </li>

                <li>
                    <span id="other" onClick={(e) => openSubMenuHandler(e.target.id)}>
                        Այլ
                        <FaAngleDown className={active.other ? "mobile-angle-down active" : "mobile-angle-down"} />
                    </span>
                    <ul className={active.other ? "mobile-dropdown-nav active" : "mobile-dropdown-nav"}>
                        <li><Link to="/about">Մեր մասին</Link></li>
                        <li>
                            <Link to="/favorites">
                                Նախընտրելի
                                <div></div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorites">
                                Զամբյուղ
                                <div></div>
                            </Link>
                        </li>
                        <li><Link to="/contact">Կապը մեզ հետ</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}