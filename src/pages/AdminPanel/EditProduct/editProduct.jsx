import "./editproduct.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { categoriesProvider, changeProducts, productsProvider } from "../../../features/products/productsSlice";
import { getProducts, editProducts } from "../../../api/products";
import {
    imageErrorProvider,
    priceErrorProvider,
    changeImageError,
    changePriceError
} from "../../../features/errors/errorsSlice";

export const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageError = useSelector(imageErrorProvider);
    const priceError = useSelector(priceErrorProvider);
    const categories = useSelector(categoriesProvider);
    const products = useSelector(productsProvider);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showOption, setShowOption] = useState(true);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [product, setProduct] = useState({});
    const [categoryId, setCategoryId] = useState("");
    const data = {
        title: product?.title,
        image: [],
        category_id: categoryId?.id,
        price: product?.price,
        description: product?.description,
    }

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    useEffect(() => {
        const result = products.filter(p => p.id === +id)[0]
        setProduct(result);
        setCategoryTitle(result?.category?.title);

        // eslint-disable-next-line
    }, [products]);

    useEffect(() => {
        setCategoryId(categories.filter(category => category.title === categoryTitle)[0]);

        // eslint-disable-next-line
    }, [categoryTitle]);

    window.addEventListener("click", function () {
        setShowOption(true);
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const clearValues = () => {
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
            e.target[3].value = "";
            e.target[4].value = "";
        }

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("category_id", data.category_id);
        formData.append("price", +data.price);
        formData.append("description", data.description);

        for (let i = 0; i < data.image.length; i++) {
            formData.append("image[]", data.image[i]);
        }

        formData.append("_method", "PATCH");

        // errors part
        const catchErrors = () => {
            let res = true;
            if (data.image.length > 4) {
                dispatch(changeImageError("*Խնդրում ենք վերբեռնել մինչև 4 լուսանկար"));
                clearValues();
                res = false;
            } else {
                dispatch(changeImageError(""));
            }

            if (data.price > 100000000) {
                dispatch(changePriceError("*Գինը պետք է լինի մինչև 100,000,000-ը"));
                clearValues();
                res = false
            } else {
                dispatch(changePriceError(""));
            }

            return res
        }

        const result = catchErrors();

        if (result) {
            try {
                await editProducts(id, formData);
                const res = await getProducts();
                dispatch(changeProducts(res.data.products));
                navigate("/dashboard/products");
            } catch (err) {
                console.log(err);
                alert("Ինչ-որ բան այն չէ, խնդրում ենք կրկին փորձել");
                navigate("/dashboard/products")
            }
        }
    }

    const onChangeHandler = (e, id) => {
        if (id === "image") {
            data[id] = e.target.files;
        } else {
            data[id] = e.target.value;
            data["category_id"] = categoryId?.id || product?.category?.id;
        }
    }

    const onSearchHandler = (e) => {
        setCategoryTitle(e.target.value);
        setShowOption(false);
        setFilteredCategories(
            categories.filter(category => category.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
        );
    }

    return (
        <section className="add-product">
            <h3 className="title">Խմբագրել հայտարարություն</h3>

            <form
                onChange={(e) => onChangeHandler(e, e.target.id)}
                onSubmit={(e) => onSubmitHandler(e, e.target.id)}>
                <div className="select">
                    <input
                        type="text"
                        name=""
                        id={"category_id"}
                        value={categoryTitle}
                        placeholder="Ընտրել կատեգորիան․․․"
                        required
                        onChange={(e) => onSearchHandler(e)}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowOption(!showOption);
                        }}
                    />

                    <ul
                        className={showOption ? "dropdown-box hide" : "dropdown-box"}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {filteredCategories?.map(category => (
                            <li key={category?.id}
                                className={!category?.parent_id ? "disabled" : ""}
                                onClick={(e) => {
                                    if (e.target.classList[0] !== "disabled") {
                                        setCategoryTitle(category?.title);
                                        setShowOption(true);
                                    }
                                }}>
                                {category?.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <input type="text" name="" id="title" defaultValue={product?.title} placeholder="Վերնագիր" required />
                {imageError && <label htmlFor="">{imageError}</label>}
                <input type="file" multiple accept="image/*" name="" id="image" />
                {priceError && <label htmlFor="">{priceError}</label>}
                <input type="number" name="" id="price" placeholder="Գին" defaultValue={product?.price} required />
                <textarea
                    name=""
                    id="description"
                    cols="90"
                    rows="5"
                    placeholder="Նկարագրություն"
                    defaultValue={product?.description}
                    required>
                </textarea>
                <input type="submit" value="Պահպանել" id="" name="" />
            </form>
        </section>
    )
}