import Button from "../../../shared-components/Button/Button.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setTitle} from "../../../store/pageSlice.ts";
import TableFilter from "../../../shared-components/Table/TableFilter.tsx";
import {AssistantsFilters} from "../constants.ts";
import AssistantsTable from "../components/AssistantsTable/AssistantsTable.tsx";
import {fetchAssistants} from "../store/assistantsSlice.ts";

const AssistantsPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar assistentes'));
    }, []);

    return (
        <>
            <Button text="Cadastrar novo medicamento +" onClick={() => setOpenCreateModal(true)}/>
            <TableFilter filters={AssistantsFilters} fetchFunction={fetchAssistants}/>
            <AssistantsTable/>
        </>
    );
};

export default AssistantsPage;