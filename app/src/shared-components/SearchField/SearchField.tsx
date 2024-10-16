import {useState} from "react";

type InputFieldProps = {
    label: string;
    name: string;
    register: any;
    error: any;
    onSearch: (text: string) => any;
    onSelect: (text: string) => void;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    variant?: 'default';
    fullWidth?: boolean;
    disabled?: boolean;
};

const SearchField = ({
                         label,
                         type = 'text',
                         placeholder,
                         name,
                         error,
                         register,
                         variant,
                         fullWidth,
                         disabled = false,
                         onSearch,
                         onSelect
                     }: InputFieldProps) => {
    const id: string = label + "_" + name;
    const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
    const [items, setItems] = useState<any>([]);

    const styleClasses = () => {
        let classes = "text-black p-1 rounded block border-mainDarkBlue border ";

        switch (variant) {
            case undefined:
            case "default":
                break;
        }

        if (fullWidth) {
            classes += " w-full";
        }

        return classes;
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
        const target = event.currentTarget as HTMLInputElement;

        if (event.key === "Escape") {
            target.blur();
            event.stopPropagation();
        }

        const value: string = target.value;

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            const searchValues = onSearch(value);
            // onSelect(value);
        }, 200);

        setDebounceTimeout(newTimeout);
    };

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                placeholder={placeholder}
                aria-placeholder={placeholder}
                type={type}
                {...register(name)}
                disabled={disabled}
                className={styleClasses()}
                onKeyDown={handleKeyDown}
            />
            {error && <p className="mt-0.5 text-[#ff4e4e]">{error?.message}</p>}


        </div>
    );
};

export default SearchField;