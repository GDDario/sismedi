type CheckboxFieldProps = {
    label: string;
    name: string;
    register: any;
    className?: string;
    error?: any;
    variant?: 'default';
    fullWidth?: boolean;
    disabled?: boolean;
};

const CheckboxField = ({label, name, error, register, variant, fullWidth, disabled = false, className}: CheckboxFieldProps) => {
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
        <div className="flex gap-2">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type="checkbox"
                {...register(name)}
                className={styleClasses()}
                disabled={disabled}
            />
            {error && <p className="mt-0.5 text-[#ff4e4e]">{error?.message}</p>}
        </div>
    );
};

export default CheckboxField;