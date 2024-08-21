import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

const AuthenticatedRoutes = () => {
    const token = 'getToken()';
    const user = 'useSelector(selectUser)';
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doLogin = async () => {

    }

    if (!token) {
        return <Navigate to="/login"/>;
    } else if (location.pathname == "/") {
        return <Navigate to="/dashboard"/>;
    }

    useEffect(() => {
        // if (!user.id) {
        //     doLogin();
        // }
    }, []);

    return (
        <div className="p-12">
            <Outlet/>
        </div>
    );
};

export default AuthenticatedRoutes;
