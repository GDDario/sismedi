import { IoCloseCircle } from "react-icons/io5";

type FilterFieldProps = {
    label: string;
    name: string;
    register: any;
    placeholder?: string;
    onRemoveField: () => void;
};

const FilterField = ({label, placeholder, name, register, onRemoveField}: FilterFieldProps) => {
    const id: string = label + "_" + name;

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <div className="flex gap-1">
                <input
                    id={id}
                    placeholder={placeholder}
                    aria-placeholder={placeholder}
                    type="text"
                    {...register(name)}
                    className="text-black p-1 rounded block border-mainDarkBlue border"
                />
                <button>
                    <IoCloseCircle size={20} className="text-white hover:text-darkRed" onClick={onRemoveField} />
                </button>
            </div>
        </div>
    );
};

export default FilterField;