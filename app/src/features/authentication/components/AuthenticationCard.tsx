import logo from '../../../assets/images/logo-sismedi.png'
import {ReactNode} from "react";

type AuthenticationCardProps = {
    children: ReactNode;
    title: string;
};

const AuthenticationCard = ({children, title}: AuthenticationCardProps) => {
    return (
        <div className="rounded-xl border-2 border-mainDarkBlue shadow-md shadow-mainDarkBlue flex h-[400px]">
            <div
                className="p-12 bg-mainBackgroundBlue w-[400px] flex justify-center items-center rounded-tl-md rounded-bl-md">
                <img src={logo} className="w-[300px]" alt='Sismedi logo'/>
            </div>

            <div className="bg-mainDarkBlue h-auto w-[2px] flex-shrink-0"/>

            <div className="p-12 w-[400px] bg-white rounded-tr-xl rounded-br-xl">
                <header className="mb-6">
                    <h1>{title}</h1>
                    <hr className="border-mainDarkBlue"/>
                </header>

                {children}
            </div>
        </div>
    );
};

export default AuthenticationCard;
