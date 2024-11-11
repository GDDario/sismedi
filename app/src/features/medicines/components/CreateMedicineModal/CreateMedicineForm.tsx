import {z} from "zod";
import InputField from "../../../../shared-components/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import Button from "../../../../shared-components/Button/Button.tsx";
import SearchField from "../../../../shared-components/SearchField/SearchField.tsx";
import FormSectionHeading from "../../../../shared-components/FormSectionHeading.tsx";
import {useDispatch} from "react-redux";
import {MedicineCategoryService} from "../../services/MedicineCategoryService.ts";
import {MedicineCategorySearch} from "../../types.ts";
import TextAreaField from "../../../../shared-components/TextAreaField.tsx";
import {MedicineService} from "../../services/MedicineService.ts";
import {showMessage} from "../../../../store/messageSlice.ts";

const schema = z.any({});

type CreateMedicineSchema = z.infer<typeof schema>;

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
    const [medicineCategory, setMedicineCategory] = useState<string>('');
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
                    <InputField className="w-[347px]" name="name" label="Nome" register={register}
                                error={errors.name}/>

                    <SearchField
                        className="w-[347px]"
                        name="category_uuid"
                        label="Categoria"
                        register={register}
                        error={errors.state}
                        onSelect={handleSelectMedicineCategory}
                        onSearch={handleMedicineCategorySearch}
                        value={medicineCategory}
                    />
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
                               fullWidth rows={4}/>

                <TextAreaField name="description" label="Descrição" register={register} error={errors.description}
                               fullWidth rows={4}/>
            </section>

            <section className="mt-2 flex gap-2">
                <Button text="Cadastrar" type="submit"/>
                <Button text="Cancelar" color="danger" type="button" onClick={onClose}/>
            </section>
        </form>
    );
};

export default CreateMedicineForm;