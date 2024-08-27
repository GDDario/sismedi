export type OpenModal = {
    open: boolean;
    uuid: string | undefined;
}

export const enum FILTER_OPTIONS {
    ID = 'Id',
    NAME = 'Name',
    CPF = 'Cpf',
    CNS = 'Cns',
    EMAIL = 'Email',
    CREATED_AT = 'Data de criação',
}

export type FilterType = {
    id?: FILTER_OPTIONS.ID,
};