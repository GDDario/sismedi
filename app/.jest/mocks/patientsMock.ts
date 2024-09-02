import {Patient} from "../../src/features/patients/models/patient.ts";

export const TDataPatientsMock: Patient[] = [
    {
        uuid: '3ea41b62-3757-4525-ae2c-794653ed92f9',
        name: 'Jhon Doe',
        cpf: '90498250016',
        cns: '785061236610000',
        email: 'jhon_doe@gmail.com',
        created_at: new Date()
    },
    {
        uuid: '07152850-7c45-4487-ba5b-430068cb0f07',
        name: 'Jeane Doe',
        cpf: '76118213003',
        cns: '934178963190006',
        email: 'jeane_doe@outlook.com',
        created_at: new Date()
    },
    {
        uuid: 'c735e2f7-973c-4590-b17e-658f2cd5aa2f',
        name: 'Jhonny Doe',
        cpf: '52207465020',
        cns: '823570125770001',
        email: 'jhonny_doe@hotmail.com',
        created_at: new Date()
    },
    {
        uuid: '8ac78dd1-1375-478f-89bf-5a586b3d8962',
        name: 'Jane Doe',
        cpf: '58029119054',
        cns: '888512478240009',
        email: 'jane_doe@email.com',
        created_at: new Date()
    }
];