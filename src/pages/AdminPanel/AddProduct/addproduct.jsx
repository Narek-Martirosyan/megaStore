import { useEffect, useState } from "react";
import "./addProduct.scss";
import { useSelector, useDispatch } from "react-redux";
import { categoriesProvider, changeProducts } from "../../../features/products/productsSlice";
import { createProduct } from "../../../api/products";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/products";
import {
    changeImageError,
    imageErrorProvider,
    changePriceError,
    priceErrorProvider
} from "../../../features/errors/errorsSlice";


export const AddProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageError = useSelector(imageErrorProvider);
    const priceError = useSelector(priceErrorProvider);
    const categories = useSelector(categoriesProvider);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showOption, setShowOption] = useState(true);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const data = {
        title: '',
        image: [],
        category_id: '',
        price: '',
        description: '',
    }

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    useEffect(() => {
        setCategoryId(categories.filter(category => category.title === categoryTitle)[0]);
    }, [categoryTitle]);

    window.addEventListener("click", function () {
        setShowOption(true);
    })

    const onSubmitHandler = async (e, id) => {
        e.preventDefault();

        const clearValues = () => {
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
            e.target[3].value = "";
            e.target[4].value = "";
        }

        const formData = new FormData;

        formData.append("title", data.title);
        formData.append("category_id", data.category_id);
        formData.append("price", +data.price);
        formData.append("description", data.description);

        for (let i = 0; i < data.image.length; i++) {
            formData.append("image[]", data.image[i]);
        }

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
                await createProduct(formData);
                const res = await getProducts();
                dispatch(changeProducts(res.data.products));
                navigate("/dashboard/products");
            } catch (err) {
                clearValues();
                console.log(err);
                alert("Ինչ-որ բան այն չէ, խնդրում ենք կրկին փորձել");
            }
        }
    }

    const onChangeHandler = (e, id) => {
        if (id === "image") {
            data[id] = e.target.files;
        } else {
            data[id] = e.target.value;
            data["category_id"] = categoryId?.id;
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
            <h3 className="title">Ավելացնել հայտարարություն</h3>

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

                <input type="text" name="" id="title" placeholder="Վերնագիր" required />
                {imageError && <label htmlFor="">{imageError}</label>}
                <input type="file" multiple accept="image/*" name="" id="image" required />
                {priceError && <label htmlFor="">{priceError}</label>}
                <input type="number" name="" id="price" placeholder="Գին" required />
                <textarea name="" id="description" cols="90" rows="5" placeholder="Նկարագրություն" required></textarea>
                <input type="submit" value="Ավելացնել" id="" name="" />
            </form>
        </section>
    )
}