import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";

type DoctorAgendaModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const DoctorAgendaModal = ({uuid, visible, onClose}: DoctorAgendaModalProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <BaseModal title="Agenda do médico XXXX" visible={visible} loading={loading} onClose={onClose}>
            <p>{uuid}</p>
        </BaseModal>
    );
}

export default DoctorAgendaModal;