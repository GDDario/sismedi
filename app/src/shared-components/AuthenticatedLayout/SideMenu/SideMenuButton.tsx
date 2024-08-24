import {useNavigate} from "react-router-dom";

export type SideMenuButtonProps = {
    text: string;
    variant?: 'light' | 'dark';
    location?: string;
    action?: () => void;
    className?: string;
};

const SideMenuButton = ({text, location, action, variant = 'light', className = ''}: SideMenuButtonProps) => {
    const navigate = useNavigate();

    const defineAction = (): (() => void) => {
        if (action !== null) {
            return action!;
        }

        const actualLocation: string = location ?? '/';

        return () => navigate(actualLocation);
    };

    const getClassNames = (): string => {
        let classNames = `${className} w-[80%] h-6 px-2 py-2 border-black border flex justify-start items-center shadow-md rounded-tr-md rounded-br-md `;

        switch (variant) {
            default:
            case 'light':
                classNames += 'bg-mainWhite text-black ';
                break;
            case 'dark':
                classNames += 'bg-black text-white ';
                break;
        }

        return classNames;
    };

    return (
        <button className={getClassNames()} type="button"
                onClick={defineAction}>
            {text}
            <p className="border"></p>
        </button>
    );
};

export default SideMenuButton;