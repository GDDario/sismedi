import {ReactNode} from "react";

export type TDataPatient = {
    uuid: string;
    name: string;
    cpf: string;
    cns: string;
    email: string;
    createdAt: Date;
    action: ReactNode;
}