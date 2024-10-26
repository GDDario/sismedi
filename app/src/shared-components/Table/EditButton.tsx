import {MdEdit} from "react-icons/md";

type EditButtonProp = {
    onClick: () => void;
}

const EditButton = ({onClick}: EditButtonProp) => {
    return (
        <button onClick={onClick}>
            <MdEdit/>
        </button>
    );
};

export default EditButton;