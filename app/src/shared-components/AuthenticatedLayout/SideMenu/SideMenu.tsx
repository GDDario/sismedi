import NavigationMenu from "./NavigationMenu.tsx";
import logo from '../../../assets/images/logovert.png'
import {BiSolidLogOut} from "react-icons/bi";
import {AuthenticationService} from "../../../features/authentication/services/AuthenticationService.ts";
import {useNavigate} from "react-router-dom";

const SideMenu = () => {
    const navigate = useNavigate();

    const logout = async () => {
        await AuthenticationService.logout();
        navigate('login');
    }

    return (
        <div className="relative h-screen min-w-[240px] w-[11vw]">
            <div
                className="fixed top-[5%] min-w-[240px] w-[11vw] h-[90%] bg-mainDarkBlue rounded-tr-xl rounded-br-xl shadow-md shadow-mainDarkBlue flex flex-col">
                <img src={logo} alt="Sismedi logo" className="w-[200px] m-4"/>

                <NavigationMenu/>

                <div className="banana flex-grow flex flex-col justify-end pb-4">
                    <button
                        className="group w-[80%] h-6 px-2 py-4 border-black border flex justify-start items-center shadow-md rounded-tr-md rounded-br-md bg-mainWhite
                                   gap-2 transition-all hover:w-[90%]"
                        onClick={() => logout()}
                    >
                        <BiSolidLogOut className="transition-all text-[20px] group-hover:text-[24px]"/>
                        Sair
                    </button>
                </div>
            </div>
        </div>

    );
};

export default SideMenu;