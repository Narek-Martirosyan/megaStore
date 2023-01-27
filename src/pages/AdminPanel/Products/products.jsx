import "./products.scss";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { filteredProductsProvider, productsProvider } from "../../../features/products/productsSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteProduct, getProducts } from "../../../api/products";
import { useNavigate } from "react-router-dom";
import { changeProducts } from "../../../features/products/productsSlice";

export const DashProducts = () => {
    const products = useSelector(filteredProductsProvider);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteProductHandler = async (e, id) => {
        e.preventDefault();
        await deleteProduct(id);
        const res = await getProducts();
        dispatch(changeProducts(res.data.products));
    }

    return (
        <section className="dashproducts">
            <Link to={"/dashboard/products/add"} className="btn btn-outline-primary add-statement">
                Ավելացնել հայտարարություն
            </Link>

            <Table striped responsive bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Կատեգորիա</th>
                        <th>Վերնագիր</th>
                        <th>Նկար</th>
                        <th>Գին</th>
                        <th>Ամսաթիվ</th>
                        <th>Գործիքներ</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product?.id}>
                            <td>{product?.id}</td>
                            <td>{product?.category?.title}</td>
                            <td>{product?.title?.length > 90 ? `${product?.title?.slice(0, 90)}...` : product?.title}</td>
                            <td>
                                <img
                                    src={product?.main_image}
                                    alt={product?.title}
                                    width={150}
                                    height={80}
                                    style={{ objectFit: "cover" }} />
                            </td>
                            <td>${product?.price}</td>
                            <td>{product?.created_at}</td>
                            <td className="actions">
                                <Link to={`/dashboard/products/edit/${product?.id}`} title="Խմբագրել"><FaEdit /></Link>
                                <Link to={""} title="Ջնջել"
                                    onClick={(e) => deleteProductHandler(e, product.id)}><FaTrashAlt />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    )
}