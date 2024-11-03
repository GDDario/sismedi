import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import EditAssistantForm from "./EditAssistantForm.tsx";
import {AssistantResponse} from "../../types.ts";
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
        // await MedicineService.getByUuid(uuid).then((medicineData: GetMedicineResponse) => {
        //     setMedicineData(medicineData.data);
        //     setLoading(false);
        // }).catch(err => {
        //     dispatch(showMessage({message: 'Erro ao tentar carregar os dados do medicamento!', type: 'error'}));
        //     console.error(err);
        //     onClose();
        // });
    }

    return (
        <BaseModal title="Editar/visualizar medicamento" visible={visible} loading={loading} onClose={onClose}
                   className="h-[70%]">
            {medicineData &&
                <EditAssistantForm onClose={onClose} medicineData={medicineData}/>
            }
        </BaseModal>
    );
}

export default EditAssistantModal;