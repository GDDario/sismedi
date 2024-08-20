import AuthenticationCard from "../components/AuthenticationCard.tsx";
import InputField from "../components/InputField.tsx";
import Button from "../../../shared-components/Button.tsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {showMessage} from "../../../store/messageSlice.ts";
import {ForgotPasswordService, ResetPasswordResponse, SendEmailResponse} from "../services/ForgotPasswordService.ts";
import {AxiosResponse} from "axios";

const schema = z
    .object({
        newPassword: z.string(),
        newPasswordConfirmation: z.string(),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
        message: "As senhas não são conferem",
        path: ["newPasswordConfirmation"],
    });

export type ResetPasswordFormSchema = z.infer<typeof schema>;

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ResetPasswordFormSchema>({resolver: zodResolver(schema)});

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (token) {
            ForgotPasswordService.confirmToken(token).catch((e: any) => {
                console.error(e);
                dispatch(showMessage({message: 'Token inválido!', type: 'error'}));
                navigate('/');
            }).finally(() => {
                setLoading(false);
            });
        } else {
            navigate('/');
            dispatch(showMessage({message: 'Token inválido!', type: 'error'}));
        }
    }, [token]);

    const onSubmit = async ({newPassword, newPasswordConfirmation}: ResetPasswordFormSchema) => {
        await ForgotPasswordService.resetPassword(newPassword, newPasswordConfirmation, token!,).then((response: AxiosResponse<ResetPasswordResponse>) => {
            dispatch(showMessage({message: response.data.message, duration: 3000}));
            navigate('/');
        }).catch((error: any) => {
            console.log('Axios error', error);
            dispatch(showMessage({message: 'Ocorreu um erro ao tentarmos redefinir sua senha', type: 'error'}));
        }).finally(() => {
            setLoading(false);
        });
    }

    return <div>
        <AuthenticationCard title="Redefinir sua senha">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Nova senha"
                    type="password"
                    placeholder="*********"
                    fullWidth
                    name="newPassword"
                    register={register}
                    error={errors.newPassword}
                />

                <InputField
                    label="Confirmação da nova senha"
                    type="password"
                    placeholder="*********"
                    fullWidth
                    name="newPasswordConfirmation"
                    register={register}
                    error={errors.newPasswordConfirmation}
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
};

export default ResetPasswordPage;