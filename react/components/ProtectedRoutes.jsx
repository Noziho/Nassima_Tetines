import {Outlet} from "react-router-dom";
import {Home} from "../pages/Home";

const useAuth = () => {
    const user = {loggedIn: false}
    return user && user.loggedIn;
}

export const ProtectedRoutes = () => {
    const isAuth = useAuth();

    return isAuth ? <Home /> : <Outlet />;
}