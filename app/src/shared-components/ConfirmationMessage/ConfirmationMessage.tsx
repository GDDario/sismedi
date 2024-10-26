import BaseModal from "../Modal/BaseModal.tsx";
import Button from "../Button/Button.tsx";
import {ReactNode} from "react";

type ConfirmationMessageProps = {
    title: string;
    visible: boolean;
    loading: boolean;
    children: ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationMessage = ({
                                 title,
                                 visible,
                                 loading,
                                 children,
                                 onClose,
                                 onConfirm,
                                 onCancel
                             }: ConfirmationMessageProps) => {
    return (
        <BaseModal title={title} visible={visible} loading={loading} onClose={onClose}>
            {children}

            <div className="flex gap-2 mt-4">
                <Button text="Confirmar" onClick={onConfirm}/>
                <Button text="Cancelar" color="danger" onClick={onCancel}/>
            </div>
        </BaseModal>
    );
};

export default ConfirmationMessage;