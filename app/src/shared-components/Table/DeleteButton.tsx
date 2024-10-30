import {MdDelete} from "react-icons/md";

type EditButtonProp = {
    onClick: () => void;
}

const DeleteButton = ({onClick}: EditButtonProp) => {
    return (
        <button onClick={onClick}>
            <MdDelete />
        </button>
    );
};

export default DeleteButton;