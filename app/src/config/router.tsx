import {createBrowserRouter} from "react-router-dom";
import UnauthenticatedRoutes from "../features/authentication/pages/UnauthenticatedRoutes.tsx";
import LoginPage from "../features/authentication/pages/LoginPage.tsx";
import AuthenticatedRoutes from "../features/authentication/pages/AuthenticatedRoutes.tsx";

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
        ],
    },
    {
        element: <AuthenticatedRoutes/>,
        path: "/",
        children: [
        ],
    },
    // {
    //     element: <ResetEmail/>,
    //     path: '/reset-email',
    // },
    // {
    //     element: <ResetPassword/>,
    //     path: '/reset-password',
    // }
]);

export default router;