import "./headSection.scss";
import { Link } from "react-router-dom";

export const HeadSection = ({ categories }) => {
    const catIDs = {}

    categories.forEach(category => {
        catIDs[category.title] = category.id;
    });

    return (
        <div className="head-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 left-side">
                        <div>
                            <img src={require("../../../img/homes.jpg")} alt="left-banner" className="homes" />
                            <div className="about-section">
                                <h3>Տներ</h3>
                                <p>Լավագույն տներն այստեղ</p>
                                <Link to={`/categories/${catIDs.Տներ}`} className="cstm-button">Տեսնել Ավելին</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-6 right-side">
                        <div className="categ-imgs">
                            <div className="col-lg-6">
                                <img
                                    src={require("../../../img/cars.jpg")}
                                    alt="cars"
                                    className="img-fluid"
                                />

                                <div className="about-section">
                                    <h5>Ավտոմեքենաներ</h5>
                                    <p>Լավագույն ավտոմեքենաներն այստեղ</p>
                                    <Link to={`/categories/${catIDs.Ավտոմեքենաներ}`} className="cstm-button">Տեսնել Ավելին</Link>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <img
                                    src={require("../../../img/bicycles.jpg")}
                                    alt="bicycles"
                                    className="img-fluid"
                                />

                                <div className="about-section">
                                    <h5>Հեծանիվներ</h5>
                                    <p>Լավագույն հեծանիվներն այստեղ</p>
                                    <Link to={`/categories/${catIDs.Հեծանիվներ}`} className="cstm-button">Տեսնել Ավելին</Link>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <img
                                    src={require("../../../img/noutbookes.jpg")}
                                    alt="noutbookes"
                                    className="img-fluid"
                                />

                                <div className="about-section">
                                    <h5>Նոութբուքեր</h5>
                                    <p>Լավագույն նոութբուքերն այստեղ</p>
                                    <Link to={`/categories/${catIDs.Նոութբուքեր}`} className="cstm-button">Տեսնել Ավելին</Link>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <img
                                    src={require("../../../img/tv.jpg")}
                                    alt="tv"
                                    className="img-fluid"
                                />

                                <div className="about-section">
                                    <h5>Հեռուստացույցեր</h5>
                                    <p>Լավագույն հեռուստացույցերն այստեղ</p>
                                    <Link to={`/categories/${catIDs.Հեռուստացույց}`} className="cstm-button">Տեսնել Ավելին</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}