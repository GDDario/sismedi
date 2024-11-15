import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../../shared-components/Button/Button.tsx";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {MedicineCategoryService} from "../../services/MedicineCategoryService.ts";
import {MedicineCategorySearch} from "../../types.ts";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import {MedicineService} from "../../services/MedicineService.ts";
import {showMessage} from "../../../../store/messageSlice.ts";

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

export type CreateMedicineSchema = z.infer<typeof schema>;

type CreateMedicineFormProps = {
    onClose: () => void;
};

const CreateMedicineForm = ({onClose}: CreateMedicineFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset
    } = useForm<CreateMedicineSchema>({resolver: zodResolver(schema)});
    const dispatch = useDispatch();

    const handleMedicineCategorySearch = async (text: string): Promise<any> => {
        const states = await MedicineCategoryService.searchByName(text);

        return states.data.map((category: MedicineCategorySearch) => {
            return {
                uuid: category.uuid,
                label: category.name
            };
        });
    }

    const handleSelectMedicineCategory = (category: any) => {
        setValue('category_uuid', category.uuid);
    }

    const onSubmit = async (data: CreateMedicineSchema) => {
        await MedicineService.create(data);

        dispatch(showMessage({message: "Medicamento cadastrado com sucesso!", type: "success"}))
        reset();
        onClose();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <FormSectionHeading text="Dados do medicamento"/>

                <div className="flex gap-4">
                    <InputField
                        className="w-[347px]"
                        name="name"
                        label="Nome"
                        register={register}
                        error={errors.name}
                        required
                    />

                    <SearchField
                        className="w-[347px]"
                        name="category_uuid"
                        label="Categoria"
                        register={register}
                        error={errors.category_uuid}
                        onSelect={handleSelectMedicineCategory}
                        onSearch={handleMedicineCategorySearch}
                        value={''}
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-[347px]"
                        name="manufacturer"
                        label="Fabricante"
                        register={register}
                        error={errors.manufacturer}
                        required
                    />

                    <InputField
                        name="batch_number"
                        label="Lote"
                        register={register}
                        error={errors.batch_number}
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-[136px]"
                        name="dosage"
                        label="Dosagem"
                        register={register}
                        error={errors.dosage}
                        required
                    />

                    <InputField
                        className="w-[150px]"
                        name="concentration"
                        label="Concentração"
                        register={register}
                        error={errors.concentration}
                        required
                    />

                    <InputField
                        name="expiration_date"
                        label="Data de validade"
                        register={register}
                        error={errors.expiration_date}
                        type="date"
                        className="w-[150px]"
                        required
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        name="quantity"
                        label="Quantidade"
                        register={register}
                        error={errors.quantity}
                        type="number"
                        required
                    />

                    <InputField
                        name="price"
                        label="Preço"
                        register={register}
                        error={errors.price}
                        type="number"
                        step="0.01"
                        required
                    />
                </div>

                <TextAreaField
                    name="prescription"
                    label="Prescrição"
                    register={register}
                    error={errors.prescription}
                    fullWidth
                    rows={4}
                    required
                />

                <TextAreaField
                    name="description"
                    label="Descrição"
                    register={register}
                    error={errors.description}
                    fullWidth
                    rows={4}
                />
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Cadastrar" type="submit"/>
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

export default CreateMedicineForm;