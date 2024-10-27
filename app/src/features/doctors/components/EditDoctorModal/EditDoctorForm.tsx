import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import Button from "../../../../shared-components/Button/Button.tsx";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import {StateService} from "../../services/StateService.ts";
import {State} from "../../models/state.ts";
import {CityService} from "../../services/CityService.ts";
import {CitySearch} from "../../types.ts";
import CopyableInput from "../../../../shared-components/CopyableInput.tsx";
import {DoctorService} from "../../services/DoctorService.ts";
import {Cellphone} from "../../models/cellphone.ts";
import {MdDelete} from "react-icons/md";
import {v4 as uuidv4} from 'uuid';
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {calculateAgeFromBirthDate} from "../../../../util/dateUtil.ts";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import { Doctor } from "../../models/doctor.ts";

const schema = z.any({});

type EditDoctorSchema = z.infer<typeof schema>;

type EditDoctorFormProps = {
    uuid: string;
    onClose: () => void;
};

const EditDoctorForm = ({uuid, onClose}: EditDoctorFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control,
        watch
    } = useForm<EditDoctorSchema>({resolver: zodResolver(schema)});
    const [stateUuid, setStateUuid] = useState<string | undefined>(undefined);
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [age, setAge] = useState<number | string>('...');
    const dispatch = useDispatch();
    const birthDate = watch("doctor.birth_date");
    const {fields, append, remove} = useFieldArray({
        control,
        name: "cellphones"
    });

    useEffect(() => {
        loadDoctorData();
    }, [uuid]);

    useEffect(() => {
        if (birthDate) {
            setAge(calculateAgeFromBirthDate(new Date(birthDate)));
        }
    }, [birthDate]);

    const loadDoctorData = async (): Promise<void> => {
        const data = await DoctorService.getDoctor(uuid);
        const doctorData = data;

        setValue('doctor.name', doctorData.doctor.name); 
        setValue('doctor.birth_date', doctorData.doctor.birth_date);
        setValue('doctor.cpf', doctorData.doctor.cpf);
        setValue('doctor.rg', doctorData.doctor.rg);
        setValue('doctor.crm', doctorData.doctor.crm);
        setValue('doctor.email', doctorData.doctor.email);

        setValue('address.postal_code', doctorData.address.postal_code);
        setCity(doctorData.address.city_name);
        setState(doctorData.address.state_name);
        setStateUuid(doctorData.address.state_uuid);
        setValue('address.state_uuid', doctorData.address.state_uuid);
        setValue('address.city_uuid', doctorData.address.city_uuid);
        setValue('address.street_address', doctorData.address.street_address);
        setValue('address.house_number', doctorData.address.house_number);
        setValue('address.neighborhood', doctorData.address.neighborhood);
        setValue('address.address_line_2', doctorData.address.address_line_2);

        //doctorData.cellphones.forEach((cellphone: Cellphone) => {
        //    append(cellphone);
        //});
    }

    const handleStateSearch = async (text: string): Promise<any> => {
        const states = await StateService.searchByName(text);

        return states.data.map((state: State) => {
            const labelText = `${state.name} - ${state.code}`;

            return {
                uuid: state.uuid,
                label: labelText
            };
        });
    }

    const handleCitySearch = async (text: string): Promise<any> => {
        const cities = await CityService.searchByNameAndState(text, stateUuid!);

        return cities.data.map((city: CitySearch) => {
            return {
                uuid: city.uuid,
                label: city.name
            };
        });
    }

    const handleSelectState = (state: any) => {
        setValue('address.state_uuid', state.uuid);
        setStateUuid(state.uuid);

    }

    const handleSelectCity = (city: any) => {
        setValue('address.city_uuid', city.uuid);
        setStateUuid(city.uuid);
    }

    const handleAddCellphoneNumber = () => {
        const newNumber = {
            uuid: uuidv4(),
            number: "",
            description: "",
            is_primary: false
        };

        append(newNumber);
    }

    const onSubmit = async (data: EditDoctorSchema) => {
        const updatedData = {
            ...data,
            cellphones: data.cellphones.map((cellphone: any, index: number) => {
                return {...cellphone, is_primary: index === 0};
            })
         }

         console.log('Sending data', updatedData)
        await DoctorService.update(uuid, updatedData);

        dispatch(showMessage({message: "Médico atualizado com sucesso!", type: "success"}))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados pessoais"/>

                <div>
                    <label>
                        Identificador
                    </label>
                    <CopyableInput value={uuid} inputClassName="w-[309px]"/>
                </div>

                <div className="flex gap-4">
                    <InputField className="w-[347px]" name="doctor.name" label="Nome do médico" register={register}
                                error={errors.name}/>

                    <div className="flex gap-2 items-end">
                        <InputField
                            name="doctor.birth_date"
                            label="Data de nascimento"
                            register={register}
                            error={errors.birth_date}
                            type="date"
                            className="w-[150px]"
                        />
                        <span>({age} anos)</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <InputField name="doctor.cpf" label="CPF" register={register} error={errors.cpf}/>
                    <InputField className="w-[136px]" name="doctor.rg" label="RG" register={register}
                                error={errors.rg}/>
                    <InputField className="w-[150px]" name="doctor.crm" label="CRM" register={register}
                                error={errors.crm}/>
                </div>

                <InputField className="w-[347px]" name="doctor.email" label="Email" register={register}
                            error={errors.email}/>
            </section>

            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Endereço"/>

                <div className="flex gap-4">
                    <InputField name="address.postal_code" label="CEP" register={register} error={errors.postal_code}/>

                    <SearchField
                        name="address.state_uuid"
                        label="Estado"
                        register={register}
                        error={errors.state}
                        onSelect={handleSelectState}
                        onSearch={handleStateSearch}
                        value={state}
                    />

                    <SearchField
                        name="address.city_uuid"
                        label="Cidade"
                        register={register}
                        error={errors.city}
                        onSelect={handleSelectCity}
                        onSearch={handleCitySearch}
                        value={city}
                        disabled={!stateUuid}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField name="address.street_address" label="Rua" register={register}
                                error={errors.street_address}/>

                    <InputField name="address.house_number" label="Número" register={register}
                                error={errors.house_number}/>

                </div>

                <div className="flex gap-4">
                    <InputField name="address.neighborhood" label="Bairro" register={register}
                                error={errors.neighborhood}/>

                    <InputField
                        name="address.address_line_2"
                        label="Complemento"
                        register={register}
                        error={errors.address_line_2}
                    />
                </div>
            </section>

            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Telefones"/>
                <div className="flex flex-col gap-2">
                    {
                        fields.map((cellphone: any, index: number) => {
                            return (
                                <div key={cellphone.uuid} className="">
                                    <span>Número {index + 1}</span>

                                    <div className="flex gap-4 items-end">
                                        <div className="flex gap-4">
                                            <InputField
                                                name={`cellphones.${index}.number`}
                                                label="Telefone"
                                                register={register}
                                                error={errors?.cellphones?.[index]?.number}
                                            />
                                            <InputField
                                                name={`cellphones.${index}.description`}
                                                label="Descrição"
                                                register={register}
                                                error={errors?.cellphones?.[index]?.description}
                                                className="w-[300px]"
                                            />
                                        </div>
                                        <div className="h-full flex items-center">
                                            <button
                                                className="p-1 rounded-full bg-black transition-all bg-opacity-0 hover:bg-opacity-20">
                                                <MdDelete className="text-2xl" onClick={() => remove(index)}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }


                </div>
                <Button className="mt-2 w-[180px]" text="Adicionar número +" type="button" onClick={() => handleAddCellphoneNumber()}/>
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Salvar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default EditDoctorForm;