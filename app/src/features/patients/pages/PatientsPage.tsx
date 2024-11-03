import PatientsTable from "../components/PatientsTable/PatientsTable.tsx";
import PatientsTableFilter from "../components/PatientsTable/PatientsTableFilter.tsx";
import Button from "../../../shared-components/Button/Button.tsx";
import {useEffect, useState} from "react";
import CreatePatientModal from "../components/CreatePatientModal/CreatePatientModal.tsx";
import {useDispatch} from "react-redux";
import {setTitle} from "../../../store/pageSlice.ts";
import TableFilter from "../../../shared-components/Table/TableFilter.tsx";
import {PatientsFilters} from "../constants.ts";
import {fetchPatients} from "../store/patientsSlice.ts";

const PatientsPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar pacientes'));
    }, []);

    return (
        <>
            <Button text="Cadastrar novo paciente +" onClick={() => setOpenCreateModal(true)}/>

            <TableFilter filters={PatientsFilters} fetchFunction={fetchPatients}/>
            <PatientsTable/>

            <CreatePatientModal
                visible={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
        </>
    );
};

export default PatientsPage;