import SideMenuButton from "./SideMenuButton.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/authentication/store/userSlice.ts";

const NavigationMenu = () => {
    const user = useSelector(selectUser);

    return !user.uuid ?
        'Carregando...'
        : (
            <div className="mt-6 flex flex-col gap-2">
                {user.type === 'assistant' &&
                    <SideMenuButton text="Assistentes" action="assistants"/>
                }
                <SideMenuButton text="Agendamentos" action="appointments"/>
                {user.type === 'assistant' &&
                    <>
                        <SideMenuButton text="Pacientes" action="patients"/>
                        <SideMenuButton text="Médicos" action="doctors"/>
                    </>
                }
                <SideMenuButton text="Consultas"/>
                {user.type === 'assistant' &&
                    <SideMenuButton text="Medicamentos" action="medicines"/>
                }
                {user.type === 'patient' &&
                    <SideMenuButton text="Atestados" action="medical-certificates"/>
                }
            </div>
        );
};

export default NavigationMenu;