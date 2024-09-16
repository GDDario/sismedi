type InputFieldProps = {
    label: string;
    type: 'text' | 'password' | 'email';
    name: string;
    register: any;
    error: any;
    placeholder?: string;
    variant?: 'default';
    fullWidth?: boolean;
};

const InputField = ({label, type, placeholder, name, error, register, variant, fullWidth}: InputFieldProps) => {
    const id: string = label + "_" + name;

    const styleClasses = () => {
        let classes = "text-black p-1 rounded block border-mainDarkBlue border ";

        switch (variant) {
            case undefined:
            case "default":
                break;
            case "bordered":
                classes += "border border-black";
                break;
        }

        if (fullWidth) {
            classes += " w-full";
        }

        return classes;
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
                className={styleClasses()}
            />
            {error && <p className="mt-0.5 text-[#ff4e4e]">{error?.message}</p>}
        </div>
    );
};

export default InputField;