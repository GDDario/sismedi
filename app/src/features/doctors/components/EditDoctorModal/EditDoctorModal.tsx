import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {DoctorService} from "../../services/DoctorService.ts";
import {GetDoctorResponse} from "../../types.ts";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import EditDoctorForm from "./EditDoctorForm.tsx";

type EditDoctorModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditDoctorModal = ({uuid, visible, onClose}: EditDoctorModalProps) => {
    const [loading, setLoading] = useState(true);
    const [doctorData, setDoctorData] = useState<any>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        getDoctorData(uuid);
    }, [uuid]);

    const getDoctorData = async (uuid: string): Promise<void> => {
        await DoctorService.getDoctor(uuid).then((response: GetDoctorResponse) => {
            console.log('Response', response)
            setDoctorData(response.data);
            setLoading(false);
        }).catch(err => {
            dispatch(showMessage({message: 'Erro ao tentar obter os dados do médico!', type: 'error'}));
            console.error(err);
            onClose();
        });
    }

    return (
        <BaseModal title="Editar/visualizar médico" visible={visible} loading={loading} onClose={onClose}
                   className="h-[70%]">
            <EditDoctorForm uuid={uuid} onClose={onClose}/>
        </BaseModal>
    );
}

export default EditDoctorModal;