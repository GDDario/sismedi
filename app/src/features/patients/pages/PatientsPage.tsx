import PatientsTable from "../components/PatientsTable/PatientsTable.tsx";
import PatientsTableFilter from "../components/PatientsTable/PatientsTableFilter.tsx";
import Button from "../../../shared-components/Button/Button.tsx";
import {useEffect, useState} from "react";
import CreatePatientModal from "../components/CreatePatientModal/CreatePatientModal.tsx";
import {useDispatch} from "react-redux";
import {setTitle} from "../../../store/pageSlice.ts";

const PatientsPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar pacientes'));
    }, []);

    return (
        <>
            <Button text="Cadastrar novo paciente +" onClick={() => setOpenCreateModal(true)}/>
            <PatientsTableFilter/>
            <PatientsTable/>
            <CreatePatientModal
                visible={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
        </>
    );
};

export default PatientsPage;