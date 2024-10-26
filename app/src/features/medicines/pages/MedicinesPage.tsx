import Button from "../../../shared-components/Button/Button.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setTitle} from "../../../store/pageSlice.ts";

const MedicinesPage = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar medicamentos'));
    }, []);

    return (
        <>
            <Button text="Cadastrar novo medicamento +" onClick={() => setOpenCreateModal(true)}/>
        </>
    );
};

export default MedicinesPage;