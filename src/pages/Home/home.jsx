import "./home.scss";
import { HeadSection } from "./HeadSection";
import { CategorySection } from "./CategorySection";
import { useSelector } from "react-redux";
import { homeProvider, carProvider, notebookeProvider, tvProvider, categoriesProvider } from "../../features/products/productsSlice";

export const Home = () => {
    const homes = useSelector(homeProvider);
    const cars = useSelector(carProvider);
    const notebooks = useSelector(notebookeProvider);
    const TV = useSelector(tvProvider);
    const categories = useSelector(categoriesProvider);

    return (
        <div className="home">
            <HeadSection categories={categories} />
            <CategorySection products={homes} title="Տներ" description="Լավագույն տներն այստեղ" />
            <CategorySection products={cars} title="Ավտոմեքենաներ" description="Լավագույն ավտոմեքենաներն այստեղ" />
            <CategorySection products={notebooks} title="Նոութբուքեր" description="Լավագույն նոութբուքերն այստեղ" />
            <CategorySection products={TV} title="Հեռուստացույցեր" description="Լավագույն հեռուստացույցերն այստեղ" />
        </div>
    )
}