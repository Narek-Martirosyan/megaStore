import "./categories.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeCategories, filteredCategoriesProvider } from "../../../features/products/productsSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { deleteCategory, getCategories } from "../../../api/categories";

export const DashCategories = () => {
    const categories = useSelector(filteredCategoriesProvider);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteCategoriesHandler = async (e, id) => {
        e.preventDefault();
        await deleteCategory(id);
        const res = await getCategories();
        dispatch(changeCategories(res.data.categories));
    }

    return (
        <section className="dashcategories">
            <Link to={"/dashboard/categories/add"} className="btn btn-outline-primary add-category">
                Ավելացնել կատեգորիա
            </Link>

            <Table striped responsive bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Մայր կատեգորիա</th>
                        <th>Վերնագիր</th>
                        <th>Նկար</th>
                        <th>Ամսաթիվ</th>
                        <th>Գործիքներ</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category?.id}>
                            <td>{category?.id}</td>
                            <td>{category?.parent ? category?.parent?.title : "N/A"}</td>
                            <td>{category?.title}</td>
                            <td>
                                <img
                                    src={category?.image}
                                    alt={category?.title}
                                    width={150}
                                    height={80}
                                    style={{ objectFit: "cover" }} />
                            </td>
                            <td>{category?.created_at}</td>
                            <td className="actions">
                                <Link to={`/dashboard/categories/edit/${category?.id}`} title="Խմբագրել"><FaEdit /></Link>
                                <Link to={""}
                                    onClick={(e) => deleteCategoriesHandler(e, category?.id)} title="Ջնջել">
                                    <FaTrashAlt />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    )
}