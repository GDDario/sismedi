import AuthenticationCard from "../components/AuthenticationCard.tsx";
import Button from "../../../shared-components/Button/Button.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ForgotPasswordService} from "../services/ForgotPasswordService.ts";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../store/messageSlice.ts";
import InputField from "../../../shared-components/InputField.tsx";

const schema = z.object({
    email: z.string().email('Email inválido'),
});

export type ForgotPasswordSchema = z.infer<typeof schema>;

const ForgotPasswordPage = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ForgotPasswordSchema>({resolver: zodResolver(schema)});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async ({email}: ForgotPasswordSchema) => {
        setLoading(true);

        await ForgotPasswordService.sendEmail(email).then((response) => {
            dispatch(showMessage({message: response.data.message, duration: 5000}));
        }).catch((error: any) => {
            console.log('Axios error', error);
        }).finally(() => {
            setLoading(false);
            console.log('Terminou')
        });
    }

    return (
        <div>
            <AuthenticationCard title="Esqueci minha senha">
                <p>Digite seu email para enviarmos um link para redefinir sua senha.</p>

                <form className="flex flex-col gap-8 mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Email"
                        type="text"
                        placeholder="exemplo@email.com"
                        fullWidth
                        name="email"
                        register={register}
                        error={errors.email}
                    />

                    <div className="flex gap-1">
                        <Button
                            className="mt-2"
                            type="button"
                            text="Cancelar"
                            onClick={() => navigate('/login')}
                            disabled={loading}
                            color="secondary"
                        />
                        <Button
                            className="mt-2"
                            text={!loading ? 'Enviar' : 'Carregando...'}
                            disabled={loading}
                        />
                    </div>
                </form>
            </AuthenticationCard>
        </div>

        // <>
        //     <div className="flex flex-col gap-2 items-center">
        //
        //
        //     <div>Page under severe maintenance...</div>
        //         <a href="/login" className="underline">Come back to the known</a>
        //     </div>
        // </>
    );
};

export default ForgotPasswordPage;

