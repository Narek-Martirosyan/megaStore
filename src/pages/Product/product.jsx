import "./product.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartIDProvider, favoriteIDProvider, productsProvider } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { onStarClick, onCartClick } from "../../addToLocalStorage";

export const Product = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const products = useSelector(productsProvider);
    const cartID = useSelector(cartIDProvider);
    const favoriteID = useSelector(favoriteIDProvider);
    const [product, setProduct] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        pauseOnHover: true,
    };

    useEffect(() => {
        let pr = products.filter(p => p.id === +id)[0]
        setProduct(pr);
        setSimilarProducts(products.filter(p => p.category_id === pr.category_id && p.id !== pr.id));
    }, [products, id]);

    return (
        <section className="product">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className="single-product">
                            <Slider {...settings}>
                                {product?.images?.map(image => (
                                    <img src={image} alt={product?.title} key={image} />
                                ))}
                            </Slider>

                            <div className="details">
                                <h5 className="title">{product?.title}</h5>

                                <div className="psc">
                                    <h4 className="price">${product?.price}</h4>
                                    <div>
                                        {favoriteID.includes(product?.id) ?
                                            <FaStar className="star" style={{ color: "red" }} onClick={() => onStarClick(product)} /> :
                                            <FaStar className="star" onClick={() => onStarClick(product)} />
                                        }
                                        {cartID.includes(product?.id) ?
                                            <FaShoppingCart className="cart" style={{ color: "green" }} onClick={() => onCartClick(product)} /> :
                                            <FaShoppingCart className="cart" onClick={() => onCartClick(product)} />
                                        }

                                    </div>
                                </div>

                                <p className="description">{product?.description}</p>

                                <div className="more-details">
                                    <span>Հայտարարությունը տեղադրվել է՝ {product?.created_at}</span>
                                    <span>Թարմացվել է՝ {product?.updated_at?.substring(0, 10)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="similar-products">
                            <h6>Նմանատիպ հայտարարություններ</h6>
                            {similarProducts?.map(product => (
                                <div className="single-product" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                    <div className="image-block">
                                        <img src={product?.main_image} alt={product?.title} />
                                    </div>

                                    <div className="description-block">
                                        {product?.title?.length > 90 ?
                                            <h6 className="title">{product?.title?.substring(0, 90)}...</h6> :
                                            <h6 className="title">{product?.title}</h6>
                                        }
                                        <h6 className="price">${product?.price}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}