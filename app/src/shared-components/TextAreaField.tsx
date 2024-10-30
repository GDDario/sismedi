type TextFieldProps = {
    label: string;
    name: string;
    register: any;
    rows?: number;
    cols?: number;
    className?: string;
    error?: any;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'date' | 'number';
    variant?: 'default';
    fullWidth?: boolean;
    disabled?: boolean;
};

const TextAreaField = ({
                           label,
                           type = 'text',
                           placeholder,
                           name,
                           error,
                           rows,
                           cols,
                           className,
                           register,
                           variant,
                           fullWidth,
                           disabled = false,
                       }: TextFieldProps) => {
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

        return classes + " " + className;
    };

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <textarea
                id={id}
                placeholder={placeholder}
                aria-placeholder={placeholder}
                type={type}
                {...register(name)}
                className={styleClasses()}
                disabled={disabled}
                rows={rows}
                cols={cols}
            >
        </textarea>
            {error && <p className="mt-0.5 text-[#ff4e4e]">{error?.message}</p>}
        </div>
    );
};

export default TextAreaField;