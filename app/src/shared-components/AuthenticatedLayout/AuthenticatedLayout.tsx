import {ReactNode} from "react";
import SideMenu from "./SideMenu/SideMenu.tsx";
import AuthenticatedLayoutHeader from "./AuthenticatedLayoutHeader/AuthenticatedLayoutHeader.tsx";

export type AuthenticatedLayoutProps = {
    children: ReactNode;
};

const Authenticatedlayout = ({children}: AuthenticatedLayoutProps) => {
    const pageName = 'Gerenciar usuários';

    return (
        <div className="flex gap-8 bg-mainBackgroundBlue">
            <SideMenu/>

            <div className="w-full overflow-y-auto mt-[5vh] pr-8">
                <AuthenticatedLayoutHeader />

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Authenticatedlayout