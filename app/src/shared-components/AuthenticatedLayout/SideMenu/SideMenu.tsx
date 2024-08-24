import NavigationMenu from "./NavigationMenu.tsx";
import logo from '../../../assets/images/logo-sismedi.png'

const SideMenu = () => {
    return (
        <div className="h-screen flex items-center">
            <div className="h-[90%] min-w-[240px] w-[11vw] bg-mainDarkBlue rounded-tr-xl rounded-br-xl shadow-md shadow-mainDarkBlue">
                <img src={logo} alt="Sismedi logo"/>

                <NavigationMenu />
            </div>
        </div>
    );
};

export default SideMenu;