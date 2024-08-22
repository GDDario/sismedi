import {useNavigate} from "react-router-dom";

export type SideMenuButtonProps = {
    text: string;
    variant?: 'light' | 'dark';
    location?: string;
    action?: () => void;
};

const SideMenuButton = ({text, location, action, variant = 'dark'}: SideMenuButtonProps) => {
    const navigate = useNavigate();

    const defineAction = (): (() => void) => {
        if (action !== null) {
            return action!;
        }

        const actualLocation: string = location ?? '/';

        return () => navigate(actualLocation);
    };

    const classNames = (): string => {

    };

    return (
        <button className="w-full h-6 flex justify-start items-center bg-black text-white" type="button"
                onClick={defineAction}>
            {text}
        </button>
    );
};

export default SideMenuButton;