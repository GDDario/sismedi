import {FaClipboardList} from "react-icons/fa";

type AppointsButtonProps = {
    onClick: () => void;
}

const AppointsButton = ({onClick}: AppointsButtonProps) => {
    return (
        <button onClick={onClick}>
            <FaClipboardList/>
        </button>
    );
}

export default AppointsButton;