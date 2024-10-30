import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useState} from "react";
import CreatePatientForm from "./CreatePatientForm.tsx";
import CreateMedicineForm from "./CreateMedicineForm.tsx";

type CreateMedicineModal = {
    visible: boolean;
    onClose: () => void;
}

const CreateMedicineModal = ({visible, onClose}: CreateMedicineModal) => {
    const [loading, setLoading] = useState(false);

    return (
        <BaseModal title="Cadastrar medicamento" visible={visible} loading={loading} onClose={onClose} className="h-[70%]">
            <CreateMedicineForm onClose={onClose}/>
        </BaseModal>
    );
}

export default CreateMedicineModal;