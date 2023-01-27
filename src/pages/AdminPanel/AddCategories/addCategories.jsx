import { useEffect, useState } from "react";
import "./addCategories.scss";
import { useSelector, useDispatch } from "react-redux";
import { categoriesProvider, changeCategories } from "../../../features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import {
    changeImageError,
    imageErrorProvider,
    changeCategoryError,
    changeTitleError,
    changeDescriptionError,
    titleErrorProvider,
    categoryErrorProvider,
    descriptionErrorProvider
} from "../../../features/errors/errorsSlice";
import { addCategories, getCategories } from "../../../api/categories";


export const AddCategories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const imageError = useSelector(imageErrorProvider);
    const titleError = useSelector(titleErrorProvider);
    const categoryError = useSelector(categoryErrorProvider);
    const descriptionError = useSelector(descriptionErrorProvider);
    const categories = useSelector(categoriesProvider);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showOption, setShowOption] = useState(true);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const data = {
        title: '',
        image: "",
        parent_id: '',
        description: ''
    }

    useEffect(() => {
        setFilteredCategories(categories);
    }, [categories]);

    useEffect(() => {
        setCategoryId(categories.filter(category => category.title === categoryTitle)[0]);

        // eslint-disable-next-line
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
        }

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("parent_id", data.parent_id);
        formData.append("image", data.image);
        formData.append("description", data.description);

        // errors part
        const catchErrors = () => {
            let res = true;
            if (!data.image) {
                dispatch(changeImageError("Լուսանկարը պարտադիր է"));
                clearValues();
                res = false;
            } else {
                dispatch(changeImageError(""));
            }

            if (!data.title) {
                dispatch(changeTitleError("Վերնագիրը պարտադիր է"));
                clearValues();
                res = false
            } else {
                dispatch(changeTitleError(""));
            }

            if (!data.parent_id) {
                dispatch(changeCategoryError("Կատեգորիան պարտադիր է"));
                clearValues();
                res = false
            } else {
                dispatch(changeCategoryError(""));
            }

            if (!data.description) {
                dispatch(changeDescriptionError("Նկարագրությունը պարտադիր է"));
                clearValues();
                res = false
            } else {
                dispatch(changeDescriptionError(""));
            }

            return res
        }

        const result = catchErrors();

        if (result) {
            try {
                await addCategories(formData);
                const res = await getCategories();
                dispatch(changeCategories(res.data.categories));
                navigate("/dashboard/categories");
            } catch (err) {
                clearValues();
                console.log(err);
                alert("Ինչ-որ բան այն չէ, խնդրում ենք կրկին փորձել");
            }
        }
    }

    const onChangeHandler = (e, id) => {
        if (id === "image") {
            data[id] = e.target.files[0];
        } else {
            data[id] = e.target.value;
            data["parent_id"] = categoryId?.id;
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
        <section className="add-category">
            <h3 className="title">Ավելացնել կատեգորիա</h3>

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
                        {categoryError && <label htmlFor="">{categoryError}</label>}
                        {filteredCategories?.map(category => (
                            <li key={category?.id}
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

                {titleError && <label htmlFor="">{titleError}</label>}
                <input type="text" name="" id="title" placeholder="Վերնագիր" required />

                {imageError && <label htmlFor="">{imageError}</label>}
                <input type="file" accept="image/*" name="" id="image" required />

                {descriptionError && <label htmlFor="">{descriptionError}</label>}
                <textarea name="" id="description" cols="90" rows="5" placeholder="Նկարագրություն" required></textarea>
                <input type="submit" value="Ավելացնել" id="" name="" />
            </form>
        </section>
    )
}