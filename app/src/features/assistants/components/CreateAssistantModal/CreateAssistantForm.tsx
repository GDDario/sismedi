import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import {AssistantService} from "../../services/AssistantService.ts";

const schema = z.any({});

type CreateAssistantSchema = z.infer<typeof schema>;

type CreatePatientFormProps = {
    onClose: () => void;
};

const CreateAssistantForm = ({onClose}: CreatePatientFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<CreateAssistantSchema>({resolver: zodResolver(schema)});
    const dispatch = useDispatch();

    const onSubmit = async (data: CreateAssistantSchema) => {
        await AssistantService.create(data);

        dispatch(showMessage({message: "Assistente atualizado com sucesso!", type: "success"}))
        reset();
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados pessoais"/>

                <div className="flex gap-4">
                    <InputField className="w-[347px]" name="name" label="Nome" register={register}
                                error={errors.name}/>
                </div>

                <div className="flex gap-4">
                    <InputField name="cpf" label="CPF" register={register} error={errors.cpf}/>
                </div>

                <InputField className="w-[347px]" name="email" label="Email" register={register}
                            error={errors.email}/>

                <InputField
                    label="Nível"
                    name="level"
                    type="number"
                    register={register}
                    error={errors.level}
                    className="w-[100px]"
                />

                <div className="flex gap-4">
                    <InputField
                        name="password"
                        type="password"
                        label="Senha" register={register}
                        error={errors.password}
                    />
                    <InputField
                        name="password_confirmation"
                        type="password"
                        label="Confirmaçáo da senha" register={register}
                        error={errors.password_confirmation}
                    />

                </div>
            </section>


            <section className="mt-2 flex gap-2">
                <Button text="Cadastrar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default CreateAssistantForm;