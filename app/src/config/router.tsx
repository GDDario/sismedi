import {createBrowserRouter} from "react-router-dom";
import UnauthenticatedRoutes from "../features/authentication/pages/UnauthenticatedRoutes.tsx";
import LoginPage from "../features/authentication/pages/LoginPage.tsx";
import AuthenticatedRoutes from "../features/authentication/pages/AuthenticatedRoutes.tsx";
import ForgotPasswordPage from "../features/authentication/pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "../features/authentication/pages/ResetPasswordPage.tsx";
import PatientsPage from "../features/patients/pages/PatientsPage.tsx";
import DoctorsPage from "../features/doctors/pages/DoctorsPage.tsx";

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
                path: "/forgot-password",
                element: <ForgotPasswordPage/>,
            },
            {
                path: '/reset-password',
                element: <ResetPasswordPage/>
            }
        ],
    },
    {
        element: <AuthenticatedRoutes/>,
        path: "/",
        children: [
            {
                index: true,
                path: "/patients",
                element: <PatientsPage/>
            },
            {
                path: "/doctors",
                element: <DoctorsPage/>
            }
        ],
    },
]);

export default router;