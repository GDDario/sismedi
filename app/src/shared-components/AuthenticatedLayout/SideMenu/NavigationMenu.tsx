import SideMenuButton from "./SideMenuButton/SideMenuButton.tsx";

const NavigationMenu = () => {
    return (
          <>
            <SideMenuButton text="Gerenciar usuários" />
            <SideMenuButton text="Gerenciar médicos" />
            <SideMenuButton text="Consultas" />
            <SideMenuButton text="Medicamentos" />
          </>
    );
};

export default NavigationMenu;