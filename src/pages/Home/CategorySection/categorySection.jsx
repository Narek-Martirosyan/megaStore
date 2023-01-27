import "./categorySection.scss";
import Slider from "react-slick";
import { FaEye, FaStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { onStarClick, onCartClick } from "../../../addToLocalStorage";
import { favoriteIDProvider, cartIDProvider } from "../../../features/products/productsSlice";

export const CategorySection = ({ products, title, description }) => {
    const favoriteID = useSelector(favoriteIDProvider);
    const cartID = useSelector(cartIDProvider);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    return (
        <section className="category-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h2>{title}</h2>
                            <span>{description}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="carousel-section">
                            <Slider {...settings}>
                                {products.length && products?.map((product) => (
                                    <div className="one-product" key={product.id + product.id}>
                                        <div className="main-product">
                                            <div className="hover-content">
                                                <ul>
                                                    <li><Link to={`/products/${product.id}`}><FaEye /></Link></li>
                                                    <li onClick={(e) => onStarClick(product)}>
                                                        <span>
                                                            {favoriteID?.includes(product.id) ?
                                                                <FaStar color="red" /> :
                                                                <FaStar />}
                                                        </span>
                                                    </li>
                                                    <li onClick={() => onCartClick(product)}>
                                                        <span>
                                                            {cartID?.includes(product.id) ?
                                                                <FaShoppingCart color="green" /> :
                                                                <FaShoppingCart />
                                                            }
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <img
                                                src={product?.main_image}
                                                alt={product?.title}
                                            />
                                        </div>

                                        <div className="describe-product">
                                            {product?.title.length > 50 ?
                                                <h5>{product?.title.substring(0, 50)}...</h5> :
                                                <h5>{product?.title}</h5>}
                                            <span>{product?.price}.00</span>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}