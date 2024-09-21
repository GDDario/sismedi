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

            <div className="w-full">
                <AuthenticatedLayoutHeader/>

                <main className="pr-20">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Authenticatedlayout