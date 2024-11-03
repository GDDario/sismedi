import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import Button from "../../../../shared-components/Button/Button.tsx";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {showMessage} from "../../../../store/messageSlice.ts";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import CopyableInput from "../../../../shared-components/CopyableInput.tsx";
import {AssistantResponse} from "../../types.ts";
import {AssistantService} from "../../services/AssistantService.ts";

const schema = z.any({});

type EditAssistantSchema = z.infer<typeof schema>;

type EditPatientFormProps = {
    onClose: () => void;
    medicineData: AssistantResponse;
};

const EditAssistantForm = ({onClose, medicineData}: EditPatientFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset
    } = useForm<EditAssistantSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...medicineData
        }
    });
    const [category, setCategory] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        resolveMedicineCategoryData();
    }, [medicineData]);

    const resolveMedicineCategoryData = (): void => {
        setValue('category_uuid', medicineData.category.uuid);
        setCategory(medicineData.category.name);
    }

    const handleSelectState = (category: any) => {
        setValue('category_uuid', category.uuid);
    }

    const onSubmit = async (updatedData: EditAssistantSchema) => {
        await AssistantService.update(medicineData.uuid, updatedData);

        dispatch(showMessage({message: "Medicamento atualizado com sucesso!", type: "success"}))
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados do medicamento"/>

                <div>
                    <label>
                        Identificador
                    </label>
                    <CopyableInput value={medicineData.uuid} inputClassName="w-[309px]"/>
                </div>

                <div className="flex gap-4">
                    <InputField className="w-[347px]" name="name" label="Nome" register={register}
                                error={errors.name}/>

                </div>

                <div className="flex gap-4">
                    <InputField className="w-[347px]" name="manufacturer" label="Fabricante" register={register}
                                error={errors.manufacturer}/>

                    <InputField name="batch_number" label="Lote" register={register} error={errors.batch_number}/>
                </div>

                <div className="flex gap-4">
                    <InputField className="w-[136px]" name="dosage" label="Dosagem" register={register}
                                error={errors.dosage}/>

                    <InputField className="w-[150px]" name="concentration" label="Concentração" register={register}
                                error={errors.concentration}/>

                    <InputField
                        name="expiration_date"
                        label="Data de validade"
                        register={register}
                        error={errors.expiration_date}
                        type="date"
                        className="w-[150px]"
                    />
                </div>

                <div className="flex gap-4">
                    <InputField name="quantity" label="Quantidade" register={register} error={errors.quantity}
                                type="number"/>

                    <InputField name="price" label="Preço" register={register} error={errors.price}
                                type="number" step="0.01"/>
                </div>

                <TextAreaField name="prescription" label="Prescrição" register={register}
                               error={errors.prescription}
                               fullWidth rows={5}/>

                <TextAreaField name="description" label="Descrição" register={register} error={errors.description}
                               fullWidth rows={3}/>
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Salvar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default EditAssistantForm;