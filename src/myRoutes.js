import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/mainLayout";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { Product } from "./pages/Product";
import { Favorites } from "./pages/Favorites";
import { Cart } from "./pages/Cart";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { AdminLayout } from "./layouts/adminLayout";
import { Login } from "./pages/AdminPanel/Login";
import { Dashboard } from "./pages/AdminPanel/Dashboard";
import { DashProducts } from "./pages/AdminPanel/Products";
import { DashCategories } from "./pages/AdminPanel/Categories";
import { AddProduct } from "./pages/AdminPanel/AddProduct";
import { EditProduct } from "./pages/AdminPanel/EditProduct";
import { AddCategories } from "./pages/AdminPanel/AddCategories";
import { EditCategories } from "./pages/AdminPanel/EditCategories";
import { Error404 } from "./pages/Error404";

export const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/megaStore" element={<Home />} />
                <Route path="/categories/:id" element={<Category />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/1" element={<About />} />
            </Route>
            <Route path="/dashboard" element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/products" element={<DashProducts />} />
                <Route path="/dashboard/products/add" element={<AddProduct />} />
                <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
                <Route path="/dashboard/categories" element={<DashCategories />} />
                <Route path="/dashboard/categories/add" element={<AddCategories />} />
                <Route path="/dashboard/categories/edit/:id" element={<EditCategories />} />
            </Route>
            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}