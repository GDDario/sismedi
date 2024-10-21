import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {PatientService} from "../../services/PatientService.ts";
import {GetPatientResponse} from "../../types.ts";
import {useDispatch} from "react-redux";
import CreatePatientForm from "./CreatePatientForm.tsx";

type EditPatientModalProps = {
    visible: boolean;
    onClose: () => void;
}

const CreatePatientModal = ({visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(false);

    return (
        <BaseModal title="Cadastrar paciente" visible={visible} loading={loading} onClose={onClose}>
            <CreatePatientForm onClose={onClose}/>
        </BaseModal>
    );
}

export default CreatePatientModal;