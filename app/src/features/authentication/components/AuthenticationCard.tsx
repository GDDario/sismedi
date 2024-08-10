import logo from '../../../assets/images/logo-sismedi.png'
import {ReactNode} from "react";

type AuthenticationCardProps = {
    children: ReactNode[]
};

const AuthenticationCard = ({children}: AuthenticationCardProps) => {
    return (
        <div className="rounded-xl border-4 border-mainDarkBlue shadow-md shadow-mainDarkBlue flex h-full">
            <div className="p-12 bg-mainBackgroundBlue w-[400px] flex justify-center items-center rounded-tl-md rounded-bl-md">
                <img src={logo} className="w-[300px]" alt='Sismedi logo'/>
            </div>

            <div className="bg-mainDarkBlue h-auto w-1 flex-shrink-0"/>

            <div className="p-12 w-[400px] bg-white rounded-tr-xl rounded-br-xl">
                {children}
            </div>
        </div>
    );
};

export default AuthenticationCard;
