import AuthenticationCard from "../components/AuthenticationCard.tsx";
import Button from "../../../shared-components/Button/Button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AuthenticationService} from "../services/AuthenticationService.ts";
import {LoginResponse} from "../types.ts";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../store/messageSlice.ts";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import InputField from "../../../shared-components/InputField.tsx";

const schema = z.object({
    login: z.string().min(1, 'Campo obrigatório'),
    password: z.string().min(1, 'Campo obrigatório')
});

export type LoginFormSchema = z.infer<typeof schema>;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormSchema>({resolver: zodResolver(schema)});

    const onSubmit = (data: LoginFormSchema) => {
        setLoading(true);

        AuthenticationService.login(data).then((response: AxiosResponse<LoginResponse>) => {
            // TODO: Verify user type to make the redirect
            AuthenticationService.saveToken(response.data.token);
            dispatch(showMessage({message: 'Logado com sucesso!', type: 'success'}));
            navigate('/patients');
        }).catch((error) => {
            console.log('Login error!', error)
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <AuthenticationCard title="Login">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                        label="Email ou RG"
                        type="text"
                        placeholder="exemplo@email.com"
                        fullWidth
                        name="login"
                        register={register}
                        error={errors.login}
                    />

                    <InputField
                        label="Senha"
                        type="password"
                        placeholder="*******"
                        fullWidth
                        name="password"
                        register={register}
                        error={errors.password}
                    />

                    <Button
                        className="mt-2"
                        text={!loading ? 'Entrar' : 'Carregando...'}
                        disabled={loading}
                    />

                    <a className="text-right underline mt-2" href="/forgot-password">Esqueci minha senha</a>
                </form>
            </AuthenticationCard>
        </div>
    );
};

export default LoginPage;