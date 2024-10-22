import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useState} from "react";
import CreatePatientForm from "./CreatePatientForm.tsx";

type EditPatientModalProps = {
    visible: boolean;
    onClose: () => void;
}

const CreatePatientModal = ({visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(false);

    return (
        <BaseModal title="Cadastrar paciente" visible={visible} loading={loading} onClose={onClose} className="h-[70%]">
            <CreatePatientForm onClose={onClose}/>
        </BaseModal>
    );
}

export default CreatePatientModal;