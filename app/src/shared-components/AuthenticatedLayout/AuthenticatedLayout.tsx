import {ReactNode} from "react";
import SideMenu from "./SideMenu/SideMenu.tsx";

export type AuthenticatedLayoutProps = {
    children: ReactNode;
};

const Authenticatedlayout = ({children}: AuthenticatedLayoutProps) => {
    return (
        <div className="flex gap-8">
            <SideMenu/>

            {children}
        </div>
    );
};

export default Authenticatedlayout