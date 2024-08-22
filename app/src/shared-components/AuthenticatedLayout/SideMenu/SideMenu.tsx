import NavigationMenu from "./NavigationMenu.tsx";

const SideMenu = () => {
    return (
        <div className="h-screen flex items-center">
            <div className="h-[80%] w-[10vw] bg-mainDarkBlue rounded-tr-xl rounded-br-xl shadow-md shadow-mainDarkBlue">
                <p className="text-white">Logo aqui</p>

                <NavigationMenu />
            </div>
        </div>
    );
};

export default SideMenu;