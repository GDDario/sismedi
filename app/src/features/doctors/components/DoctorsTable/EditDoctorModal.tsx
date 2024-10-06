import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";

type EditDoctorModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditDoctorModal = ({uuid, visible, onClose}: EditDoctorModalProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <BaseModal title="Editar/visualizar médico" visible={visible} loading={loading} onClose={onClose}>
            <p></p>
        </BaseModal>
    );
}

export default EditDoctorModal;