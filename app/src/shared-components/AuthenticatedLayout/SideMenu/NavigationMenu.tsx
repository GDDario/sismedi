import SideMenuButton from "./SideMenuButton.tsx";

const NavigationMenu = () => {
    return (
        <div className="mt-6 flex flex-col gap-2">
            <SideMenuButton text="Gerenciar usuários" action=""/>
            <SideMenuButton text="Gerenciar pacientes" action="patients"/>
            <SideMenuButton text="Gerenciar médicos" action="doctors"/>
            <SideMenuButton text="Consultas"/>
            <SideMenuButton text="Medicamentos" action="medicines"/>
        </div>
    );
};

export default NavigationMenu;