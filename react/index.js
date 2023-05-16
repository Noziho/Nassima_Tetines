import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from './pages/Home';
import {Register} from "./pages/user/Register";
import {Login} from "./pages/user/Login";
import {RouteNotFound} from "./components/RouteNotFound/RouteNotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />

            <Route path="*" element={<RouteNotFound/>} />
        </Routes>
    </BrowserRouter>
);
