import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useState} from "react";
import CreateAssistantForm from "./CreateAssistantForm.tsx";

type CreatePatientModalProps = {
    visible: boolean;
    onClose: () => void;
}

const CreateAssistantModal = ({visible, onClose}: CreatePatientModalProps) => {
    const [loading, setLoading] = useState(false);

    return (
        <BaseModal title="Cadastrar paciente" visible={visible} loading={loading} onClose={onClose} className="h-[70%]">
            <CreateAssistantForm onClose={onClose}/>
        </BaseModal>
    );
}

export default CreateAssistantModal;