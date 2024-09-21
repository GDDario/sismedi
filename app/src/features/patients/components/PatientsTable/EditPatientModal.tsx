import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";

type EditPatientModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditPatientModal = ({uuid, visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <BaseModal title="Editar/visualizar paciente" visible={visible} loading={loading} onClose={onClose}>
            <p></p>
        </BaseModal>
    );
}

export default EditPatientModal;