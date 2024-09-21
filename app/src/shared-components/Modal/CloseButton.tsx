import { IoCloseCircle } from "react-icons/io5";

type CloseButtonProps = {
    onClick: () => void;
};

const CloseButton = ({onClick}: CloseButtonProps) => {
    return (
        <button onClick={onClick}>
            <IoCloseCircle size={28} className="hover:text-mainRed"/>
        </button>
    );
};

export default CloseButton;