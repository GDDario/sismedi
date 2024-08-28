import NavigationMenu from "./NavigationMenu.tsx";
import logo from '../../../assets/images/logo-sismedi.png'

const SideMenu = () => {
    return (
        <div className="relative h-screen min-w-[240px] w-[11vw]">
            <div className="fixed top-[5%] min-w-[240px] w-[11vw] h-[90%] bg-mainDarkBlue rounded-tr-xl rounded-br-xl shadow-md shadow-mainDarkBlue">
                <img src={logo} alt="Sismedi logo"/>

                <NavigationMenu />
            </div>
        </div>
    );
};

export default SideMenu;