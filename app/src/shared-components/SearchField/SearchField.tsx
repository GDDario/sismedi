import {ChangeEvent, useEffect, useRef, useState} from "react";
import FoundItems from "./FoundItems.tsx";

type InputFieldProps = {
    label: string;
    name: string;
    register: any;
    error: any;
    onSearch: (text: string) => any;
    onSelect: (text: string) => void;
    value: string;
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
                         onSelect,
                         value: valueInput
                     }: InputFieldProps) => {
    const id: string = label + "_" + name;
    const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
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

    const handleChange = async (event: ChangeEvent): Promise<void> => {
        const target = event.target as HTMLInputElement;

        const value: string = target.value;
        setValue(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(async () => {
            const searchValues = await onSearch(value);

            setItems(searchValues);
        }, 200);

        setDebounceTimeout(newTimeout);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const target = event.target as HTMLInputElement;

        if (event.key === "Escape") {
            target.blur();
            event.stopPropagation();
            setItems([]);
        }
    };

    const handleOnSelect = async (item: any) => {
        setItems([]);
        onSelect(item);
        setValue(item.label);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setItems([]);
        }
    };

    return (
        <div className="relative">
            <label htmlFor={id}>{label}</label>
            <input
                ref={inputRef}
                id={id}
                placeholder={placeholder}
                aria-placeholder={placeholder}
                type={type}
                {...register(name)}
                disabled={disabled}
                className={styleClasses()}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={value}
            />
            {error && <p className="mt-0.5 text-[#ff4e4e]">{error?.message}</p>}

            <FoundItems items={items} onSelectItem={handleOnSelect}/>
        </div>
    );
};

export default SearchField;