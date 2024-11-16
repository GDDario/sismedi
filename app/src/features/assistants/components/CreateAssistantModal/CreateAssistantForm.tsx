import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import {AssistantService} from "../../services/AssistantService.ts";

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    cpf: z
        .string()
        .regex(/^\d{11}$/, "O CPF deve conter exatamente 11 dígitos numéricos."),
    email: z.string().email("O email deve ser válido."),
    level: z
        .coerce
        .number()
        .int("O nível deve ser um número inteiro.")
        .min(1, "O nível deve ser no mínimo 1.")
        .max(10, "O nível deve ser no máximo 3."),
    password: z
        .string()
        .min(6, "A senha deve ter no mínimo 6 caracteres."),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "A confirmação da senha deve ser igual à senha.",
});

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

        dispatch(showMessage({message: "Assistente cadastrado com sucesso!", type: "success"}))
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
                        name="name"
                        label="Nome"
                        register={register}
                        error={errors.name}
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        name="cpf"
                        label="CPF"
                        register={register}
                        error={errors.cpf}
                        required
                    />
                </div>

                <InputField
                    className="w-[347px]"
                    name="email"
                    label="Email"
                    register={register}
                    error={errors.email}
                    required
                />

                <InputField
                    label="Nível"
                    name="level"
                    type="number"
                    register={register}
                    error={errors.level}
                    className="w-[100px]"
                    required
                />

                <div className="flex gap-4">
                    <InputField
                        name="password"
                        type="password"
                        label="Senha" register={register}
                        error={errors.password}
                        required
                    />

                    <InputField
                        name="password_confirmation"
                        type="password"
                        label="Confirmaçáo da senha" register={register}
                        error={errors.password_confirmation}
                        required
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