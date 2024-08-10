type ButtonProps = {
    text: string;
    className?: string;
    color?: 'primary' | 'outlined';
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}

const Button = ({color = "primary", text, type = "submit", className, disabled = false}: ButtonProps) => {
    const resolveClassNames = (): string => {
        let classNames = 'px-4 py-1 rounded-xl border border-mainDarkBlue font-medium ';

        switch (color) {
            case "primary":
                classNames += 'bg-mainDarkBlue text-mainWhite';
                break;
            case "outlined":
                classNames += 'bg-mainWhite text-mainDarkBlue border-2 border';
                break;
        }

        if (disabled) {
            classNames += ' opacity-70';
        }

        return `${classNames} ${className}`;
    };

    return <button disabled={disabled} className={resolveClassNames()} type={type}>{text}</button>;
};

export default Button;