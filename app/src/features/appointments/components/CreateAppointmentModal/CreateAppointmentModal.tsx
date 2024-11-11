import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useState} from "react";
import CreateAppointmentForm from "./CreateAppointmentForm.tsx";

type CreatePatientModalProps = {
    visible: boolean;
    onClose: () => void;
}

const CreateAppointmentModal = ({visible, onClose}: CreatePatientModalProps) => {
    const [loading, setLoading] = useState(false);

    return (
        <BaseModal title="Cadastrar agendamento de consulta" visible={visible} loading={loading} onClose={onClose}
                   className="h-[70%]">
            <CreateAppointmentForm onClose={onClose}/>
        </BaseModal>
    );
}

export default CreateAppointmentModal;