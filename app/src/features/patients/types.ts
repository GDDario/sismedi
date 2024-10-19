import {Patient} from "./models/patient.ts";
import {State} from "./models/state.ts";
import {City} from "./models/city.ts";

export type OpenModal = {
    open: boolean;
    uuid: string | undefined;
}

export type ListPatientsResponse = {
    data: Patient[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
};

export type GetPatientResponse = {
    data: {
        patient: Patient;
    };
};

export type SearchStatesResponse = {
    data: State[];
};

type Code = {
    code: string;
}

export type CitySearch = City & Code;

export type SearchCitiesResponse = {
    data: CitySearch[];
}