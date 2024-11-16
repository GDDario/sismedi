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
import {PatientService} from "../../services/PatientService.ts";
import {MdDelete} from "react-icons/md";
import {v4 as uuidv4} from 'uuid';
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {DateUtil} from "../../../../util/DateUtil.ts";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";

const schema = z.object({
    patient: z.object({
        name: z.string().min(1, "O nome é obrigatório."),
        birth_date: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "A data de nascimento deve estar no formato yyyy-mm-dd."),
        cpf: z
            .string()
            .regex(/^\d{11}$/, "O CPF deve conter exatamente 11 dígitos numéricos."),
        rg: z
            .string()
            .regex(/^\d{1,20}$/, "O RG deve conter apenas números (até 20 caracteres)."),
        cns: z
            .string()
            .regex(/^\d{15}$/, "O CNS deve conter exatamente 15 dígitos."),
        email: z.string().email("O email deve ser válido."),
        password: z
            .string()
            .min(6, "A senha deve ter no mínimo 6 caracteres.")
            .max(50, "A senha deve ter no máximo 50 caracteres."),
        password_confirmation: z.string(),
    }).refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "A confirmação da senha deve ser igual à senha.",
    }),
    address: z.object({
        postal_code: z
            .string()
            .regex(/^\d{8}$/, "O CEP deve conter exatamente 8 dígitos."),
        state_uuid: z.string().uuid("O estado selecionado é inválido."),
        city_uuid: z.string().uuid("A cidade selecionada é inválida."),
        street_address: z.string().min(1, "A rua é obrigatória."),
        house_number: z
            .string().min(1, "O número é obrigatório."),
        neighborhood: z.string().min(1, "O bairro é obrigatório."),
        address_line_2: z.string().nullable().optional(),
    }),
    cellphones: z
        .array(
            z.object({
                number: z
                    .string()
                    .regex(/^\d{10,11}$/, "O telefone deve conter 10 ou 11 dígitos."),
                description: z.string().min(1, "A descrição é obrigatória."),
            })
        )
        .min(1, "É necessário informar pelo menos um número de telefone."),
});


export type CreatePatientSchema = z.infer<typeof schema>;

type CreatePatientFormProps = {
    onClose: () => void;
};

const CreatePatientForm = ({onClose}: CreatePatientFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control,
        watch,
        reset
    } = useForm<CreatePatientSchema>({resolver: zodResolver(schema)});
    const [stateUuid, setStateUuid] = useState<string | undefined>(undefined);
    const [age, setAge] = useState<number | string>('...');
    const dispatch = useDispatch();
    const birthDate = watch("patient.birth_date");
    const {fields, append, remove} = useFieldArray({
        control,
        name: "cellphones"
    });

    useEffect(() => {
        handleAddCellphoneNumber();
    }, []);

    useEffect(() => {
        if (birthDate) {
            setAge(DateUtil.calculateAgeFromBirthDate(new Date(birthDate)));
        }
    }, [birthDate]);

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

    const onSubmit = async (data: CreatePatientSchema) => {
        const updatedData = {
            ...data,
            cellphones: data.cellphones.map((cellphone: any, index: number) => {
                return {...cellphone, is_primary: index === 0};
            })
        }

        await PatientService.create(updatedData);

        dispatch(showMessage({message: "Paciente atualizado com sucesso!", type: "success"}))
        reset();
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados pessoais"/>

                <div className="flex gap-4">
                    <InputField
                        className="w-[347px]"
                        name="patient.name"
                        label="Nome do paciente"
                        register={register}
                        error={errors?.patient?.name}
                    />

                    <div className="flex gap-2 items-end">
                        <InputField
                            name="patient.birth_date"
                            label="Data de nascimento"
                            register={register}
                            error={errors?.patient?.birth_date}
                            type="date"
                            className="w-[150px]"
                        />
                        <span>({age} anos)</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <InputField
                        name="patient.cpf"
                        label="CPF"
                        register={register}
                        error={errors?.patient?.cpf}
                    />
                    <InputField
                        className="w-[136px]"
                        name="patient.rg"
                        label="RG"
                        register={register}
                        error={errors?.patient?.rg}/>
                    <InputField
                        className="w-[150px]"
                        name="patient.cns"
                        label="CNS"
                        register={register}
                        error={errors?.patient?.cns}
                    />
                </div>

                <InputField
                    className="w-[347px]"
                    name="patient.email"
                    label="Email"
                    register={register}
                    error={errors?.patient?.email}
                />

                <div className="flex gap-4">
                    <InputField
                        name="patient.password"
                        type="password"
                        label="Senha do paciente"
                        register={register}
                        error={errors?.patient?.password}
                    />
                    <InputField
                        name="patient.password_confirmation"
                        type="password"
                        label="Confirmaçáo da senha"
                        register={register}
                        error={errors?.patient?.password_confirmation}
                    />

                </div>
            </section>

            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Endereço"/>

                <div className="flex gap-4">
                    <InputField
                        name="address.postal_code"
                        label="CEP"
                        register={register}
                        error={errors?.address?.postal_code}
                    />

                    <SearchField
                        name="address.state_uuid"
                        label="Estado"
                        register={register}
                        error={errors?.address?.state_uuid}
                        onSelect={handleSelectState}
                        onSearch={handleStateSearch}
                        value=''
                    />

                    <SearchField
                        name="address.city_uuid"
                        label="Cidade"
                        register={register}
                        error={errors?.address?.city_uuid}
                        onSelect={handleSelectCity}
                        onSearch={handleCitySearch}
                        value=''
                        disabled={!stateUuid}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        name="address.street_address"
                        label="Rua"
                        register={register}
                        error={errors?.address?.street_address}
                    />

                    <InputField
                        name="address.house_number"
                        label="Número"
                        register={register}
                        error={errors?.address?.house_number}
                    />

                </div>

                <div className="flex gap-4">
                    <InputField
                        name="address.neighborhood"
                        label="Bairro"
                        register={register}
                        error={errors?.address?.neighborhood}
                    />

                    <InputField
                        name="address.address_line_2"
                        label="Complemento"
                        register={register}
                        error={errors?.address?.address_line_2}
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
                <Button className="mt-2 w-[180px]" text="Adicionar número +" type="button"
                        onClick={() => handleAddCellphoneNumber()}/>
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Cadastrar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default CreatePatientForm;