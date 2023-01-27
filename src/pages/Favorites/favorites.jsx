import "./favorites.scss";
import { useSelector } from "react-redux";
import { cartIDProvider, favoriteIDProvider, favoritesProvider, categoriesProvider } from "../../features/products/productsSlice";
import { FaStar, FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { onStarClick, onCartClick } from "../../addToLocalStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Favorites = () => {
    const favorites = useSelector(favoritesProvider);
    const favoriteID = useSelector(favoriteIDProvider);
    const cartID = useSelector(cartIDProvider);
    const categories = useSelector(categoriesProvider);
    const navigate = useNavigate();
    const [showMore, setShowMore] = useState(false);

    return (
        <section className="favorites">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="categories">
                            <h5 className="title" onClick={() => setShowMore(!showMore)}>Կատեգորիաներ
                                <span>
                                    <FaAngleDown className={showMore ?
                                        "show-more-angle-down active" : "show-more-angle-down"} />
                                </span>
                            </h5>

                            <div className={showMore ? "main-categories-parent active" : "main-categories-parent"}>
                                {categories?.map(category => (
                                    <div key={category?.id}>
                                        {!category.parent_id ?
                                            <h6 className="main-categories"
                                                onClick={() => navigate(`/categories/${category.id}`)}>
                                                {category.title}
                                            </h6> :
                                            <p className="subcategories"
                                                onClick={() => navigate(`/categories/${category.id}`)}>
                                                {category.title}
                                            </p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="favorites-block">
                            <h5 className="fav-announce">Նախընտրած հայտարարություններ</h5>
                            {favorites?.map(product => (
                                <div
                                    className="one-favorite-block"
                                    key={product.id}
                                    onClick={() => navigate(`/products/${product?.id}`)}
                                >
                                    <div className="product-part">
                                        <div className="img-block">
                                            <img src={product?.main_image} alt={product?.title} />
                                        </div>

                                        <div className="tdp">
                                            <h6 className="title">{product?.title}</h6>
                                            {product?.description?.length > 100 ?
                                                <h6 className="description">
                                                    {product?.description.substring(0, 100)}...
                                                </h6> :
                                                <h6 className="description">
                                                    {product?.description}
                                                </h6>
                                            }
                                            <h5 className="price">${product?.price}</h5>
                                        </div>

                                        <div className="star-cart">
                                            {favoriteID.includes(product.id) ?
                                                <FaStar className="star" color="red" onClick={(e) => {
                                                    e.stopPropagation();
                                                    onStarClick(product);
                                                }} /> :
                                                <FaStar className="star" onClick={(e) => {
                                                    e.stopPropagation();
                                                    onStarClick(product);
                                                }} />
                                            }

                                            {cartID.includes(product.id) ?
                                                <FaShoppingCart className="cart" color="green" onClick={(e) => {
                                                    e.stopPropagation();
                                                    onCartClick(product);
                                                }} /> :
                                                <FaShoppingCart className="cart" onClick={(e) => {
                                                    e.stopPropagation();
                                                    onCartClick(product);
                                                }} />
                                            }
                                        </div>
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