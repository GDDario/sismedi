import {ReactNode, useState} from "react";
import CloseButton from "./CloseButton.tsx";

type BaseModalProps = {
    title: string;
    children: ReactNode;
    loading: boolean;
    visible: boolean;
    onClose: () => void;
};

const BaseModal = ({title, children, visible: modalVisible, loading, onClose}: BaseModalProps) => {
    const [visible, setVisible] = useState(modalVisible);

    return (
        <div
            className={`h-screen w-full bg-black bg-opacity-40 flex justify-center items-center 
            absolute top-0 left-0 ${!visible && 'invisible'}`}>
            <section className="bg-mainWhite p-12 rounded-xl w-[45%] shadow-md shadow-black">
                <header className="flex justify-between items-center">
                    <h2 className="select-none">{title}</h2>

                    <CloseButton onClick={onClose}/>
                </header>

                <div>
                    {loading ? 'Loading (center spinner here)' :
                        children}
                </div>
            </section>

        </div>
    );
};

export default BaseModal;