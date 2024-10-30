import BaseModal from "../../../../shared-components/Modal/BaseModal.tsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import EditMedicineForm from "./EditMedicineForm.tsx";
import {MedicineService} from "../../services/MedicineService.ts";
import {GetMedicineResponse, MedicineResponse} from "../../types.ts";

type EditPatientModalProps = {
    uuid: string;
    visible: boolean;
    onClose: () => void;
}

const EditMedicineModal = ({uuid, visible, onClose}: EditPatientModalProps) => {
    const [loading, setLoading] = useState(true);
    const [medicineData, setMedicineData] = useState<MedicineResponse | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        getMedicineData();
    }, [uuid]);

    const getMedicineData = async (): Promise<void> => {
        await MedicineService.getByUuid(uuid).then((medicineData: GetMedicineResponse) => {
            setMedicineData(medicineData.data);
            setLoading(false);
        }).catch(err => {
            dispatch(showMessage({message: 'Erro ao tentar carregar os dados do medicamento!', type: 'error'}));
            console.error(err);
            onClose();
        });
    }

    return (
        <BaseModal title="Editar/visualizar medicamento" visible={visible} loading={loading} onClose={onClose}
                   className="h-[70%]">
            {medicineData &&
                <EditMedicineForm onClose={onClose} medicineData={medicineData}/>
            }
        </BaseModal>
    );
}

export default EditMedicineModal;