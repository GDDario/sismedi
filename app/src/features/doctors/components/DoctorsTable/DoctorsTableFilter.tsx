import Button from "../../../../shared-components/Button/Button.tsx";
import {useState} from "react";
import {DoctorsFilters} from "../../constants.ts";
import {FilterType} from "../../../../types.ts";
import {useFieldArray, useForm} from "react-hook-form";
import FilterField from "../../../../shared-components/FilterField.tsx";
import {showMessage} from "../../../../store/messageSlice.ts";
import {useDispatch} from "react-redux";
import {fetchDoctors} from "../../store/doctorsSlice.ts";

const DoctorsTableFilter = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const {control, register, handleSubmit} = useForm();
    const {fields, append, remove} = useFieldArray({
        control,
        name: "filters",
    });

    const handleMenuOpen = () => {
        if (fields.length >= DoctorsFilters.length) {
            dispatch(showMessage({message: 'Não existem mais filtros disponíveis para essa tabela.', type: 'info'}))
            return;
        }

        setMenuOpen(!menuOpen);
    }

    const handleSelectFilter = (item: FilterType) => {
        append({...item});
        setMenuOpen(false);
    }

    const removeField = (fieldName: any) => {
        remove(fieldName);
    }

    const onSubmit = (data: any) => {
        let queryParams: object | any = {};

        if (data.filters && Array.isArray(data.filters)) {
            data.filters.forEach((item: any, index: number) => {
                if (item.value.trim() !== '') {
                    const number = index + 1;

                    queryParams[`name${number}`] = item.name;
                    queryParams[`value${number}`] = item.value;
                }
            });
        }

        console.log('Query params', queryParams)

        // @ts-ignore
        dispatch(fetchDoctors({page: 1, per_page: 17, ...queryParams}));
    }

    return (
        <section className="min-h-[58px] flex items-end">
            <form className="flex gap-2 w-full justify-between items-end mb-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex gap-x-2 gap-y-1 items-end flex-wrap">
                    <Button text="Adicionar filtro" type="button" onClick={handleMenuOpen}/>

                    {
                        fields.map((field: any, index: number) => (
                            <FilterField
                                key={field.id}
                                label={field.label}
                                name={`filters.${index}.value`}
                                register={register}
                                onRemoveField={() => removeField(`filters.${index}.value`)}
                            />
                        ))
                    }

                    {
                        menuOpen &&
                        <div
                            className="absolute top-[36px] left-0 w-[164px] h-[200px] bg-mainDarkBlue rounded-xl z-10 shadow-black shadow-sm text-white">

                            <ul>
                                {Object.values(DoctorsFilters).map((doctorFilter: FilterType) => {
                                    let canRender = true;
                                    fields.forEach((item: any) => {
                                        if (item.name == doctorFilter.name) {
                                            canRender = false;
                                        }
                                    })

                                    if (!canRender) return null;

                                    return (
                                        <li
                                            className="px-2 py-1 border-b-[1px] border-white hover:bg-white hover:bg-opacity-10 cursor-pointer"
                                            key={doctorFilter.name}
                                            onClick={() => handleSelectFilter(doctorFilter)}
                                        >
                                            {doctorFilter.label}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    }
                </div>

                <div className="flex gap-2">
                    <Button text="Limpar" type="reset" color="secondary" disabled={fields.length === 0}/>
                    <Button text="Filtrar" type="submit"/>
                </div>
            </form>
        </section>
    );
};

export default DoctorsTableFilter;