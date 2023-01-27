import "./category.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { categoriesProvider, productsProvider } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import { FaAngleDown, FaStar, FaShoppingCart } from "react-icons/fa";
import { onCartClick, onStarClick } from "../../addToLocalStorage";
import { favoriteIDProvider, cartIDProvider } from "../../features/products/productsSlice";

export const Category = () => {
    const [showMore, setShowMore] = useState(false);
    const { id } = useParams();
    const [filterCategory, setFilterCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [priceChecker, setPriceChecker] = useState(true);
    const [render, setRender] = useState(false);
    const products = useSelector(productsProvider);
    const categories = useSelector(categoriesProvider);
    const navigate = useNavigate();
    const favoriteID = useSelector(favoriteIDProvider);
    const cartID = useSelector(cartIDProvider);
    const [prices, setPrices] = useState({
        min: null,
        max: null
    });

    useEffect(() => {
        setCategory(products.filter(product => product.category_id === +id || product.category.parent_id === +id));
        setFilterCategory(products.filter(product => product.category_id === +id || product.category.parent_id === +id));

        let p = products.map(prod => prod.price);

        if (p.length > 0) {
            prices.min = Math.min(...p);
            prices.max = Math.max(...p);

            setPrices({ ...prices });
        }

        setRender(true);

        // eslint-disable-next-line
    }, [products, id]);

    const searchHandler = (e) => {
        if ((e.target.value === "" && prices.min === 0 && prices.max === 0) || (e.target.value === "" && prices.max < prices.min)) {
            setCategory(products.filter(product => product.category_id === +id || product.category.parent_id === +id))
        } else {
            setCategory(filterCategory.filter(c => (c.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                || c.description.toLowerCase().search(e.target.value.toLowerCase()) !== -1) &&
                c.price >= prices.min && c.price <= prices.max));
        }
    }

    const priceHandler = (e) => {
        if (e.target.id === "min") {
            setPrices({ min: +e.target.value, max: prices.max });
        } else {
            setPrices({ min: prices.min, max: +e.target.value });
        }
        setPriceChecker(!priceChecker);
    }


    useEffect(() => {
        if (render) {
            if (prices.min !== null && prices.max !== null) {
                setCategory(filterCategory.filter(c => c.price >= prices.min && c.price <= prices.max));
            }

            if (prices.max < prices.min) {
                setCategory(filterCategory.filter(c => c.price >= prices.min));
            }

            if (prices.min === 0 && prices.max === 0) {
                let p = products.map(prod => prod.price);

                if (p.length > 0) {
                    prices.min = Math.min(...p);
                    prices.max = Math.max(...p);

                    setPrices({ ...prices });
                }
                setCategory(products.filter(product => product.category_id === +id || product.category.parent_id === +id))
            }
        }

        // eslint-disable-next-line
    }, [priceChecker]);

    return (
        <section className="category">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="filter-tools">
                            <div className="search-system">
                                <h6>Որոնել ըստ բառերի</h6>
                                <input type="text" placeholder="Որոնել" onChange={(e) => searchHandler(e)} />
                            </div>

                            <div className="filter-by-price">
                                <h6>Որոնել ըստ գնի ($)</h6>
                                <form className="inputs" onChange={(e) => priceHandler(e)}>
                                    <input
                                        type="number"
                                        min={0}
                                        id="min"
                                        placeholder="Սկսած"
                                    />

                                    <input
                                        type="number"
                                        min={0}
                                        id="max"
                                        placeholder="Մինչև"
                                    />
                                </form>
                            </div>

                            <div className="more-categories">
                                <h5 className="title" onClick={() => setShowMore(!showMore)}>Կատեգորիաներ
                                    <span>
                                        <FaAngleDown className={showMore ? "show-more-angle-down active" : "show-more-angle-down"} />
                                    </span>
                                </h5>
                                <div className={showMore ? "main-categories-parent active" : "main-categories-parent"}>
                                    {categories.map(category => (
                                        <div key={category.id}>
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
                    </div>

                    <div className="col-lg-8">
                        <div className="category-products">
                            {category.length > 0 ? category.map(product => (
                                <div
                                    key={product.id}
                                    className="product-description"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    <div className="img-block">
                                        <img src={product?.main_image} alt={product?.title} />
                                    </div>

                                    <div className="description-block">
                                        {product?.title.length < 80 ?
                                            <h6 className="title">{product?.title}</h6> :
                                            <h6 className="title">{product?.title.substring(0, 80)}...</h6>
                                        }

                                        {product?.description.length < 130 ?
                                            <p className="description">{product?.description}</p> :
                                            <p className="description">{product?.description.substring(0, 130)}...</p>
                                        }

                                        <div className="p-s-c">
                                            <h5 className="price">${product?.price}</h5>
                                            <div>
                                                {favoriteID?.includes(product.id) ?
                                                    <FaStar className="star" color="red" onClick={(e) => {
                                                        e.stopPropagation();
                                                        onStarClick(product);
                                                    }} /> :
                                                    <FaStar className="star" onClick={(e) => {
                                                        e.stopPropagation();
                                                        onStarClick(product);
                                                    }} />
                                                }

                                                {cartID?.includes(product.id) ?
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
                                </div>
                            )) : <h1>Արդյունքներ չեն գտնվել</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}