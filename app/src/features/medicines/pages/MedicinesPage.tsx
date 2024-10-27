import Button from "../../../shared-components/Button/Button.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setTitle} from "../../../store/pageSlice.ts";
import MedicinesTable from "../components/MedicinesTable/MedicinesTable.tsx";
import TableFilter from "../../../shared-components/Table/TableFilter.tsx";
import {MedicinesFilters} from "../constants.ts";
import {fetchMedicines} from "../store/medicinesSlice.ts";
import CreateMedicineModal from "../components/CreateMedicineModal/CreateMedicineModal.tsx";

const MedicinesPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar medicamentos'));
    }, []);

    return (
        <>
            <Button text="Cadastrar novo medicamento +" onClick={() => setOpenCreateModal(true)}/>
            <TableFilter filters={MedicinesFilters} fetchFunction={fetchMedicines}/>
            <MedicinesTable/>

            <CreateMedicineModal
                visible={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
            />
        </>
    );
};

export default MedicinesPage;