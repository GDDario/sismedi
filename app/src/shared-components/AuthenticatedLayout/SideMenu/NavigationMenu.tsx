import SideMenuButton from "./SideMenuButton.tsx";

const NavigationMenu = () => {
    return (
        <div className="mt-6 flex flex-col gap-2">
            <SideMenuButton text="Gerenciar usuários"/>
            <SideMenuButton text="Gerenciar médicos"/>
            <SideMenuButton text="Consultas"/>
            <SideMenuButton text="Medicamentos"/>
        </div>
    );
};

export default NavigationMenu;