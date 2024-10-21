import PatientsTable from "../components/PatientsTable/PatientsTable.tsx";
import PatientsTableFilter from "../components/PatientsTable/PatientsTableFilter.tsx";
import Button from "../../../shared-components/Button/Button.tsx";
import {useState} from "react";
import CreatePatientModal from "../components/CreatePatientModal/CreatePatientModal.tsx";

const PatientsPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

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