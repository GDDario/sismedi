import AuthenticationCard from "../components/AuthenticationCard.tsx";
import Button from "../../../shared-components/Button.tsx";
import InputField from "../components/InputField.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {login} from "../services/authenticationService.ts";
import {LoginResponse} from "../types.ts";
import {useState} from "react";

const schema = z.object({
    login: z.string().min(1, 'Campo obrigatório'),
    password: z.string().min(1, 'Campo obrigatório')
});

export type LoginFormSchema = z.infer<typeof schema>

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginFormSchema>({resolver: zodResolver(schema)});

    const onSubmit = (data: LoginFormSchema) => {
        setLoading(true);

        login(data).then((response: LoginResponse) => {
            console.log('Login response', response);
        }).catch((error) => {
            console.log('Login error!', error)
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <AuthenticationCard>
                <header className="mb-6">
                    <h1>Login</h1>
                    <hr className="border-mainDarkBlue"/>
                </header>

                <form className="flex flex-col  gap-2" onSubmit={handleSubmit(onSubmit)}>
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