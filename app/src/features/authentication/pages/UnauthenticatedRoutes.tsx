import { Navigate, Outlet, useLocation } from "react-router-dom";

const UnauthenticatedRoutes = () => {
    const token = undefined;
    const location = useLocation();

    if (token) {
        return <Navigate to="/dashboard" />;
    } else if (location.pathname == "/") {
        return <Navigate to="/login" />;
    }

    return (
        <div className="w-screen h-screen bg-mainWhite flex justify-center items-center">
            <Outlet />
        </div>
    );
};

export default UnauthenticatedRoutes;
