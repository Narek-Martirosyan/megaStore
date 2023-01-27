import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { FaAngleDown } from "react-icons/fa";
import { Mobile } from "./Mobile";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { categoriesProvider, favoritesProvider, cartProvider } from "../../features/products/productsSlice";

export const Header = () => {
    const [scrollTo, setScrollTo] = useState(false);
    const categories = useSelector(categoriesProvider);
    const catID = {};
    const cart = useSelector(cartProvider);
    const favorites = useSelector(favoritesProvider);

    categories.forEach(category => {
        catID[category.title.replace(/ +/g, "")] = category.id;
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 130) {
                setScrollTo(true);
            } else {
                setScrollTo(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={scrollTo ? "nav navbar sticky-navbar" : "nav navbar"}>
            <div className="container container-cstm">
                <Link to={"/megaStore"} className="logo">
                    <img src={logo} alt="logo" />
                </Link>
                <ul className="navigation-bar">
                    <li>
                        <Link to={"/megaStore"}>Գլխավոր</Link>
                    </li>

                    <li>
                        <span>Անշարժ գույք <FaAngleDown className="angle-down" /></span>
                        <ul className="dropdown-nav">
                            <li><Link to={`/categories/${catID.Անշարժգույք}`}>Բոլորը</Link></li>
                            <li><Link to={`/categories/${catID.Բնակարաններ}`}>Բնակարաններ</Link></li>
                            <li><Link to={`/categories/${catID.Տներ}`}>Տներ</Link></li>
                            <li><Link to={`/categories/${catID.Ավտոտնակներ}`}>Ավտոտնակներ</Link></li>
                        </ul>
                    </li>

                    <li>
                        <span>Տրանսպորտ <FaAngleDown className="angle-down" /></span>
                        <ul className="dropdown-nav">
                            <li><Link to={`/categories/${catID.Տրանսպորտ}`}>Բոլորը</Link></li>
                            <li><Link to={`/categories/${catID.Ավտոմեքենաներ}`}>Ավտոմեքենաներ</Link></li>
                            <li><Link to={`/categories/${catID.Բեռնատարներ}`}>Բեռնատարներ</Link></li>
                            <li><Link to={`/categories/${catID.Պահեստամասեր}`}>Պահեստամասեր</Link></li>
                            <li><Link to={`/categories/${catID.Հեծանիվներ}`}>Հեծանիվներ</Link></li>
                        </ul>
                    </li>

                    <li>
                        <span>Էլեկտրոնիկա <FaAngleDown className="angle-down" /></span>
                        <ul className="dropdown-nav">
                            <li><Link to={`/categories/${catID.Էլեկտրոնիկա}`}>Բոլորը</Link></li>
                            <li><Link to={`/categories/${catID.Բջջայինհեռախոսներ}`}>Բջջային հեռախոսներ</Link></li>
                            <li><Link to={`/categories/${catID.Նոութբուքեր}`}>Նոութբուքեր</Link></li>
                            <li><Link to={`/categories/${catID.Հեռուստացույց}`}>Հեռուստացույցեր</Link></li>
                        </ul>
                    </li>
                    
                    <li>
                        <span>Այլ <FaAngleDown className="angle-down" /></span>
                        <ul className="dropdown-nav">
                            <li><Link to="/about">Մեր մասին</Link></li>
                            <li>
                                <Link to="/favorites">
                                    Նախընտրելի
                                    <div className="around">{favorites?.length ?? 0}</div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    Զամբյուղ
                                    <div className="around">{cart?.length ?? 0}</div>
                                </Link>
                            </li>
                            <li><Link to="/contact">Կապը մեզ հետ</Link></li>
                        </ul>
                    </li>
                </ul>
                <Mobile />
            </div>
        </nav>
    )
}