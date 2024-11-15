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
import {MedicineCategoryService} from "../../services/MedicineCategoryService.ts";
import {MedicineCategorySearch, MedicineResponse} from "../../types.ts";
import {MedicineService} from "../../services/MedicineService.ts";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import CopyableInput from "../../../../shared-components/CopyableInput.tsx";

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório."),
    category_uuid: z.string().uuid({message: 'Valor inválido.'}),
    manufacturer: z.string().min(1, "O fabricante é obrigatório."),
    batch_number: z.string().min(1, "O lote é obrigatório."),
    dosage: z.string().min(1, "A dosagem é obrigatória."),
    concentration: z.coerce.number().nonnegative("A concentração não pode ser negativa."),
    expiration_date: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "A data de validade deve estar no formato yyyy-mm-dd."
        )
        .refine(
            (date) => new Date(date) > new Date(),
            "A data de validade deve ser uma data futura."
        ),
    quantity: z
        .coerce
        .number()
        .int("A quantidade deve ser um número inteiro.")
        .nonnegative("A quantidade não pode ser negativa."),
    price: z.coerce.number().nonnegative("O preço não pode ser negativo."),
    prescription: z.string().min(1, "A prescrição é obrigatória."),
    description: z.string().optional()
});

type EditMedicineSchema = z.infer<typeof schema>;

type EditPatientFormProps = {
    onClose: () => void;
    medicineData: MedicineResponse;
};

const EditMedicineForm = ({onClose, medicineData}: EditPatientFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<EditMedicineSchema>({
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

    const handleMedicineCategorySearch = async (text: string): Promise<any> => {
        const states = await MedicineCategoryService.searchByName(text);

        return states.data.map((category: MedicineCategorySearch) => {
            return {
                uuid: category.uuid,
                label: category.name
            };
        });
    }

    const handleSelectState = (category: any) => {
        setValue('category_uuid', category.uuid);
    }

    const onSubmit = async (updatedData: EditMedicineSchema) => {
        await MedicineService.update(medicineData.uuid, updatedData);

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
                    <InputField
                        className="w-[347px]"
                        name="name"
                        label="Nome"
                        register={register}
                        error={errors.name}
                    />

                    <SearchField
                        className="w-[347px]"
                        name="category_uuid"
                        label="Categoria"
                        register={register}
                        error={errors.category_uuid}
                        onSelect={handleSelectState}
                        onSearch={handleMedicineCategorySearch}
                        value={category}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-[347px]"
                        name="manufacturer"
                        label="Fabricante"
                        register={register}
                        error={errors.manufacturer}
                    />

                    <InputField
                        name="batch_number"
                        label="Lote"
                        register={register}
                        error={errors.batch_number}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-[136px]"
                        name="dosage"
                        label="Dosagem"
                        register={register}
                        error={errors.dosage}
                    />

                    <InputField
                        className="w-[150px]"
                        name="concentration"
                        label="Concentração"
                        register={register}
                        error={errors.concentration}
                    />

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
                    <InputField
                        name="quantity"
                        label="Quantidade"
                        register={register}
                        error={errors.quantity}
                        type="number"/>

                    <InputField
                        name="price" label="Preço"
                        register={register}
                        error={errors.price}
                        type="number"
                        step="0.01"
                    />
                </div>

                <TextAreaField
                    name="prescription"
                    label="Prescrição"
                    register={register}
                    error={errors.prescription}
                    fullWidth rows={5}
                />

                <TextAreaField
                    name="description"
                    label="Descrição"
                    register={register}
                    error={errors.description}
                    fullWidth rows={3}
                />
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Salvar" type="submit"/>
                <Button
                    text="Cancelar"
                    color="danger"
                    type="button"
                    onClick={onClose}
                />
            </section>
        </form>
    );
};

export default EditMedicineForm;