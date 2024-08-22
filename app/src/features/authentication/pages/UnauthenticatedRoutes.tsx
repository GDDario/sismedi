import { Navigate, Outlet, useLocation } from "react-router-dom";
import {AuthenticationService} from "../services/AuthenticationService.ts";

const UnauthenticatedRoutes = () => {
    const token = AuthenticationService.getToken();
    const location = useLocation();

    if (token) {
        // TODO: Verify user type to make the redirect
        return <Navigate to="/patients" />;
    } else if (location.pathname == "/") {
        return <Navigate to="/login" />;
    }

    return (
        <div className="w-screen h-screen bg-mainWhite flex justify-center items-center">
            <Outlet/>
        </div>
    );
};

export default UnauthenticatedRoutes;
