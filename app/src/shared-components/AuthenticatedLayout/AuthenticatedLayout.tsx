import {ReactNode} from "react";
import SideMenu from "./SideMenu/SideMenu.tsx";
import AuthenticatedLayoutHeader from "./AuthenticatedLayoutHeader/AuthenticatedLayoutHeader.tsx";

export type AuthenticatedLayoutProps = {
    children: ReactNode;
};

const Authenticatedlayout = ({children}: AuthenticatedLayoutProps) => {
    return (
        <div className="flex gap-20 bg-mainBackgroundBlue">
            <SideMenu/>

            <div className="w-full overflow-y-auto mt-[5vh] pr-20">
                <AuthenticatedLayoutHeader />

                <main className="mt-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Authenticatedlayout