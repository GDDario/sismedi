import { MdOutlineContentCopy } from "react-icons/md";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {showMessage} from "../store/messageSlice.ts";

type CopyableInputProps = {
    value: string;
    disabled?: boolean;
    inputClassName?: string;
};

const CopyableInput = ({value, disabled = true, inputClassName}: CopyableInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value);
    const dispatch = useDispatch();

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;

        setInputValue(target.value);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        dispatch(showMessage({message: "Valor copiado para a área de transferência", type: "info"}))
    }

    return (
        <div className="text-black p-1 bg-white rounded border-mainDarkBlue border flex gap-1 items-center w-fit">
            <input
                className={inputClassName}
                value={inputValue}
                onChange={handleChange}
                disabled={disabled}/>
            <MdOutlineContentCopy
                className="cursor-pointer p-1 rounded-full text-2xl bg-black bg-opacity-0 hover:bg-opacity-10"
                onClick={handleCopy}
            />
        </div>
    );
};

export default CopyableInput;