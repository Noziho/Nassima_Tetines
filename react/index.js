import '../assets/styles/App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from './pages/Home';
import {Register} from "./pages/user/Register";
import {Login} from "./pages/user/Login";
import {RouteNotFound} from "./components/RouteNotFound/RouteNotFound";
import {ProductList} from "./pages/ProductList/ProductList";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/products" element={<ProductList/>} />

            <Route path="*" element={<RouteNotFound/>} />
        </Routes>
    </BrowserRouter>
);
