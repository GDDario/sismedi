import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import EditAssistantForm from "./EditAssistantForm.tsx";
import {AssistantResponse, GetAssistantResponse} from "../../types.ts";
import {AssistantService} from "../../services/AssistantService.ts";
import {showMessage} from "../../../../store/messageSlice.ts";
// import {GetMedicineResponse, MedicineResponse} from "../../types.ts";

type EditPatientModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditAssistantModal = ({uuid, visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(true);
    const [medicineData, setMedicineData] = useState<AssistantResponse | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        getMedicineData();
    }, [uuid]);

    const getMedicineData = async (): Promise<void> => {
        await AssistantService.getByUuid(uuid).then((assistantData: GetAssistantResponse) => {
            setMedicineData(assistantData.data);
            setLoading(false);
        }).catch(err => {
            dispatch(showMessage({message: 'Erro ao tentar carregar os dados do assistente!', type: 'error'}));
            console.error(err);
            onClose();
        });
    }

    return (
        <BaseModal title="Editar/visualizar assistente" visible={visible} loading={loading} onClose={onClose}
                   className="h-[70%]">
            {medicineData &&
                <EditAssistantForm onClose={onClose} assitantData={medicineData}/>
            }
        </BaseModal>
    );
}

export default EditAssistantModal;