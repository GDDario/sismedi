import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setTitle} from "../../../store/pageSlice.ts";
import Button from "../../../shared-components/Button/Button.tsx";
import TableFilter from "../../../shared-components/Table/TableFilter.tsx";
import {AppointmentsFilters} from "../constants.ts";
import AppointmentsTable from "../components/AppointmentsTable/AppointmentsTable.tsx";
import {fetchAppointments} from "../store/appointmentsSlice.ts";
import CreateAppointmentModal from "../components/CreateAppointmentModal/CreateAppointmentModal.tsx";

const AppointmentsPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect((): void => {
        dispatch(setTitle('Gerenciar agendamentos de consultas'));
    }, []);

    return (
        <>
            <Button text="Cadastrar novo agendamento +" onClick={() => setOpenCreateModal(true)}/>

            <TableFilter filters={AppointmentsFilters} fetchFunction={fetchAppointments}/>
            <AppointmentsTable />
=
            <CreateAppointmentModal
                visible={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
        </>
    );
};

export default AppointmentsPage;