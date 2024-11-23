import {setTitle} from "../../../store/pageSlice.ts";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Button from "../../../shared-components/Button/Button.tsx";
import DoctorsTable from "../components/DoctorsTable/DoctorsTable.tsx";
import TableFilter from "../../../shared-components/Table/TableFilter.tsx";
import {DoctorsFilters} from "../constants.ts";
import {fetchDoctors} from "../store/doctorsSlice.ts";
import CreateDoctorModal from "../components/CreateDoctorModal/CreateDoctorModal.tsx";

type DoctorsPageProps = {};
const DoctorsPage = ({}: DoctorsPageProps) => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar médicos'));
        document.title = "Sismedi - Médicos";
    }, []);

    return (
        <>

            <Button text="Cadastrar novo médico +" onClick={() => setOpenCreateModal(true)}/>
            <TableFilter filters={DoctorsFilters} fetchFunction={fetchDoctors}/>
            <DoctorsTable/>
            <CreateDoctorModal
                visible={openCreateModal}
                onClose={() => {
                    setOpenCreateModal(false);
                    window.location.reload();
                }}
            />
        </>
    );
};

export default DoctorsPage;