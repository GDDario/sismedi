import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AuthenticationService} from "../services/AuthenticationService.ts";
import {selectUser, setUser} from "../store/userSlice.ts";
import {showMessage} from "../../../store/messageSlice.ts";
import AuthenticatedLayout from "../../../shared-components/AuthenticatedLayout/AuthenticatedLayout.tsx";

const AuthenticatedRoutes = () => {
    const token = AuthenticationService.getToken();
    const user = useSelector(selectUser);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doLogin = async () => {
        try {
            const userData = await AuthenticationService.tokenLogin();
            dispatch(setUser(userData.data));

        } catch (error: any) {
            dispatch(showMessage({message: 'Erro no login automático.', type: 'error'}));
            localStorage.clear();
            sessionStorage.clear();

            navigate('/login');
        }
    }

    if (!token) {
        return <Navigate to="/login"/>;
    } else if (location.pathname == "/") {
        return <Navigate to="/dashboard"/>;
    }

    useEffect(() => {
        if (!user.id) {
            doLogin();
        }
    }, []);

    return (
        <AuthenticatedLayout>
            <Outlet/>
        </AuthenticatedLayout>
    );
};

export default AuthenticatedRoutes;
