import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {PatientService} from "../../services/PatientService.ts";
import {GetPatientResponse} from "../../types.ts";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import EditPatientForm from "./EditPatientForm.tsx";

type EditPatientModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditPatientModal = ({uuid, visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState<any>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        getPatientData(uuid);
    }, [uuid]);

    const getPatientData = async (uuid: string): Promise<void> => {
        await PatientService.getPatient(uuid).then((response: GetPatientResponse) => {
            console.log('Response', response)
            setPatientData(response.data);
            setLoading(false);
        }).catch(err => {
            dispatch(showMessage({message: 'Error on getting the patient data!', type: 'error'}));
            console.error(err);
            onClose();
        });
    }

    return (
        <BaseModal title="Editar/visualizar paciente" visible={visible} loading={loading} onClose={onClose}>
            <EditPatientForm />
        </BaseModal>
    );
}

export default EditPatientModal;