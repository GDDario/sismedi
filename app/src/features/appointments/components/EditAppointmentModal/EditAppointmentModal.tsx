import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import EditAppointmentForm from "./EditAppointmentForm.tsx";
import {AppointmentResponse, AssistantResponse, GetAppointmentResponse, GetAssistantResponse} from "../../types.ts";
import {AppointmentService} from "../../services/AppointmentService.ts";
import {showMessage} from "../../../../store/messageSlice.ts";
// import {GetMedicineResponse, MedicineResponse} from "../../types.ts";

type EditPatientModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditAppointmentModal = ({uuid, visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(true);
    const [medicineData, setMedicineData] = useState<AppointmentResponse | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        getMedicineData();
    }, [uuid]);

    const getMedicineData = async (): Promise<void> => {
        await AppointmentService.getByUuid(uuid).then((assistantData: GetAppointmentResponse) => {
            setMedicineData(assistantData.data);
            setLoading(false);
        }).catch(err => {
            dispatch(showMessage({message: 'Erro ao tentar carregar os dados do assistente!', type: 'error'}));
            console.error(err);
            onClose();
        });
    }

    return (
        <BaseModal title="Editar/visualizar pedido de agendamento" visible={visible} loading={loading} onClose={onClose}
                   className="h-[70%]">
            {medicineData &&
                <EditAppointmentForm onClose={onClose} appointmentData={medicineData}/>
            }
        </BaseModal>
    );
}

export default EditAppointmentModal;