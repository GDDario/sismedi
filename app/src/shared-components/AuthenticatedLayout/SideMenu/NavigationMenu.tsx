import SideMenuButton from "./SideMenuButton.tsx";

const NavigationMenu = () => {
    return (
        <div className="mt-6 flex flex-col gap-2">
            <SideMenuButton text="Assistentes" action="assistants"/>
            <SideMenuButton text="Pacientes" action="patients"/>
            <SideMenuButton text="Médicos" action="doctors"/>
            <SideMenuButton text="Consultas"/>
            <SideMenuButton text="Medicamentos" action="medicines"/>
        </div>
    );
};

export default NavigationMenu;