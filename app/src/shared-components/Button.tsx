type ButtonProps = {
    text: string;
    className?: string;
    color?: 'primary' | 'secondary' | 'outlined';
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({color = "primary", text, type = "submit", className, disabled = false, onClick}: ButtonProps) => {
    const resolveClassNames = (): string => {
        let classNames = 'px-4 py-1 rounded-xl border border-mainDarkBlue font-medium ';

        switch (color) {
            case "primary":
                classNames += 'bg-mainDarkBlue text-mainWhite';
                break;
            case "secondary":
                classNames += 'bg-mainWhite text-mainDarkBlue';
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

    return <button disabled={disabled} className={resolveClassNames()} type={type} onClick={onClick}>{text}</button>;
};

export default Button;