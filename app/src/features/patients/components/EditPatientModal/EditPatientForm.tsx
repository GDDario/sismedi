import {z} from "zod";
import InputField from "../../../../shared-components/InputField";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useMemo, useState} from "react";
import Button from "../../../../shared-components/Button/Button.tsx";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import {StateService} from "../../services/StateService.ts";
import {State} from "../../models/state.ts";
import {CityService} from "../../services/CityService.ts";
import {City} from "../../models/city.ts";
import {CitySearch} from "../../types.ts";
import CopyableInput from "../../../../shared-components/CopyableInput.tsx";

const schema = z.any({});

type EditPatientSchema = z.infer<typeof schema>;

type EditPatientFormProps = {
    uuid: string;
};

const EditPatientForm = ({uuid}: EditPatientFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues
    } = useForm<EditPatientSchema>({resolver: zodResolver(schema)});
    const [stateUuid, setStateUuid] = useState<string | undefined>(undefined);

    useEffect(() => {

    }, [uuid]);

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
        const states = await CityService.searchByNameAndState(text, stateUuid!);

        return states.data.map((city: CitySearch) => {
            return {
                uuid: city.uuid,
                label: city.name
            };
        });
    }

    const handleSelectState = (state: any) => {
        setValue('state', state.uuid);
        setStateUuid(state.uuid);
    }

    const onSubmit = (data: EditPatientSchema) => {
        console.log('Form submited:', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <section>
                <h2>Dados pessoais</h2>
                {/*<InputField name="uuid" label="ID do paciente" register={register} error={errors.uuid}/>*/}
                <CopyableInput value={uuid} inputClassName="w-[309px]" />
                <InputField name="name" label="Nome do paciente" register={register} error={errors.name}/>

                <div>
                    <InputField name="birth_date" label="Data de nascimento" register={register}
                                error={errors.birth_date}
                    />
                    <span>... anos</span> {/* Today - birth date */}
                </div>

                <InputField name="cpf" label="CPF" register={register} error={errors.cpf}/>
                <InputField name="rg" label="RG" register={register} error={errors.rg}/>
                <InputField name="cns" label="CNS" register={register} error={errors.cns}/>

                <InputField name="email" label="Email" register={register} error={errors.email}/>
            </section>

            <section>
                <h2>Endereço</h2>
                <InputField name="cep" label="CEP" register={register} error={errors.cep}/>

                <SearchField
                    name="state"
                    label="Estado"
                    register={register}
                    error={errors.state}
                    onSelect={handleSelectState}
                    onSearch={handleStateSearch}
                />

                <SearchField
                    name="city"
                    label="Cidade"
                    register={register}
                    error={errors.city}
                    onSelect={(city: any) => setValue('city', city.uuid)}
                    onSearch={handleCitySearch}
                    disabled={!stateUuid}
                />

                <InputField name="street_address" label="Rua" register={register} error={errors.street_address}/>

                <InputField name="house_number" label="Número" register={register} error={errors.house_number}/>

                <InputField name="neighborhood" label="Bairro" register={register} error={errors.neighborhood}/>

                <InputField
                    name="address_line_2"
                    label="Complemento"
                    register={register}
                    error={errors.address_line_2}
                />
                {/*<SearchField name="city" label="Cidade" register={register} error={errors.city}*/}
                {/*             onSelect={(_: string) => {}}*/}
                {/*             onSearch={handleCitySearch}*/}
                {/*/>*/}
                {/*<InputField name="city" label="Cidade" register={register} error={errors.city}/>*/}
                {/*<InputField name="state" label="Estado" register={register} error={errors.state}/>*/}
            </section>

            <section>
                <h2>Telefones</h2>
                <div>
                    <span>Número 1</span>
                    <InputField name="cellphone_1" label="Telefone" register={register} error={errors.cellphone_1}
                    />
                    <InputField name="description_1" label="Descrição" register={register}
                                error={errors.description_1}/>

                </div>
                <Button text="Adicionar número +"/>
            </section>

            <section>
                <Button text="Salvar" type="submit"/>
                <Button text="Cancelar" color="danger"/>
            </section>
        </form>
    );
};

export default EditPatientForm;