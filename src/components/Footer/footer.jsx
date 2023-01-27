import "./footer.scss";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRegEnvelope, FaPhoneAlt } from "react-icons/fa";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="left-side">
                <img src={logo} alt="logo" />
                <ul>
                    <li><span><FaMapMarkerAlt /> 1 Հանրապետության Հրապարակ, Երևան, Հայաստան</span></li>
                    <li><a href="mailto:megastore@company.am"> <FaRegEnvelope /> megastore@company.am</a></li>
                    <li><a href="tel:+37493044866"> <FaPhoneAlt /> +374 (93) 044 899</a></li>
                </ul>
            </div>

            <div className="right-side">
                <h5 className="right-title">Օգտակար Հղումներ</h5>
                <div className="lists">
                    <ul>
                        <li><Link to={"/about"}>Մեր մասին</Link></li>
                        <li><Link to={"/contact"}>Հետադարձ կապ</Link></li>
                        <li><Link to={"/help/1"}>Օգտագործման համաձայնագիր</Link></li>
                    </ul>
                    <ul>
                        <li><Link to={"/map"}>Կայքի քարտեզ</Link></li>
                        <li><Link to={"/help"}>Օգնություն</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}