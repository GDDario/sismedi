import {createBrowserRouter} from "react-router-dom";
import UnauthenticatedRoutes from "../features/authentication/pages/UnauthenticatedRoutes.tsx";
import LoginPage from "../features/authentication/pages/LoginPage.tsx";
import AuthenticatedRoutes from "../features/authentication/pages/AuthenticatedRoutes.tsx";
import ForgotPasswordPage from "../features/authentication/pages/ForgotPasswordPage.tsx";

const router = createBrowserRouter([
    {
        element: <UnauthenticatedRoutes/>,
        path: "/",
        children: [
            {
                index: true,
                path: "/login",
                element: <LoginPage/>,
            },
            {
                index: true,
                path: "/forgot-password",
                element: <ForgotPasswordPage/>,
            },
        ],
    },
    {
        element: <AuthenticatedRoutes/>,
        path: "/",
        children: [],
    },
]);

export default router;