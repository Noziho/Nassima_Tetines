import '../assets/styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from './pages/Home';
import {Register} from "./pages/user/Register";
import {Login} from "./pages/user/Login";
import {RouteNotFound} from "./components/RouteNotFound/RouteNotFound";
import {ProductList} from "./pages/ProductList/ProductList";
import {ProductDetails} from "./pages/ProductDetails/ProductDetails";
import {ProtectedRoutes} from "./components/ProtectedRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<ProtectedRoutes />}>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Route>

            <Route path="/products" element={<ProductList/>} />
            <Route path="/product/:productID" element={<ProductDetails />} />

            <Route path="*" element={<RouteNotFound/>} />
        </Routes>
    </BrowserRouter>
);
