import {ChangeEvent, useState} from "react";

export type SelectOptionType = {
    label: string; // Is the shown part
    name: any; // Is the actual value of the option
};

type InputFieldProps = {
    label: string;
    name: string;
    register: any;
    error: any;
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
                         className,
                         options
                     }: InputFieldProps) => {
    const id: string = label + "_" + name;
    const [value, setValue] = useState<string>('');

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