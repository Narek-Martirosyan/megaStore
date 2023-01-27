import "./error404.scss";
import { FaRegFrownOpen, FaRegFrown, FaRegDizzy } from "react-icons/fa";

export const Error404 = () => {
    return (
        <div className="error-404">
            <div className="container">
                <div className="err">
                    <div className="emojy">
                        <FaRegFrownOpen />
                        <FaRegFrown />
                        <FaRegDizzy />
                    </div>
                    <h1>Սխալ 404, Էջը չի գտնվել</h1>
                    <p className="err-text">Գնալ <a href="/">գլխավոր էջ</a> կամ <a href="/contact">կապվել մեզ հետ</a></p>
                </div>
            </div>
        </div>
    )
}