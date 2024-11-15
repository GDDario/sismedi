import {ChangeEvent, useEffect, useRef, useState} from "react";
import FoundItems from "./FoundItems.tsx";

export type SelectOptionType = {
    label: string; // Is the shown part
    name: any; // Is the actual value of the option
};

type InputFieldProps = {
    label: string;
    name: string;
    register: any;
    error: any;
    value: string;
    options: SelectOptionType[];
    required?: boolean;
    variant?: 'default';
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
};

const SelectField = ({
                         label,
                         name,
                         error,
                         register,
                         variant,
                         required = false,
                         fullWidth,
                         disabled = false,
                         value: valueInput,
                         className,
                         options
                     }: InputFieldProps) => {
    const id: string = label + "_" + name;
    const [items, setItems] = useState<any>([]);
    const [value, setValue] = useState<string>(valueInput);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setValue(valueInput);
    }, [valueInput]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const styleClasses = () => {
        let classes = "text-black p-1 bg-white rounded block border-mainDarkBlue border ";

        if (variant === "default" || variant === undefined) {
            classes += "";
        }

        if (fullWidth) {
            classes += " w-full";
        }

        return classes + " " + className;
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setItems([]);
        }
    };

    return (
        <div className="relative">
            <label htmlFor={id}>{label} {required && '*'}</label>
            <select
                id={id}
                {...register(name)}
                disabled={disabled}
                className={styleClasses()}
                value={value}
                onChange={handleSelectChange}
            >
                {options.map((option: SelectOptionType, index: number) => (
                    <option
                        key={index + option.name}
                        value={option.name}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-0.5 text-[#ff4e4e]">{error?.message}</p>}
        </div>
    );
};

export default SelectField;