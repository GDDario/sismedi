import {Doctor} from "./models/doctor.ts";
import {State} from "./models/state.ts";
import {City} from "./models/city.ts";
import {Address} from "./models/address.ts";
import {Cellphone} from "./models/cellphone.ts";

export type OpenModal = {
    open: boolean;
    uuid: string | undefined;
}

export type ListDoctorsResponse = {
    data: Doctor[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
}

export type SearchDoctorsByNameResponse = {
    data: {
        uuid: string;
        name: string;
    }[];
}
export type GetDoctorResponse = {
    doctor: Doctor;
    address: Address;
    cellphones: Cellphone[];
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

export type CreateOrUpdateDoctorData = {
    doctor: Doctor;
    address: Address;
    cellphones: Cellphone[];
}
