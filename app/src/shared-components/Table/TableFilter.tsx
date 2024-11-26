import {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Button from "../Button/Button.tsx";
import {FilterType} from "../../types.ts";
import {showMessage} from "../../store/messageSlice.ts";
import FilterField from "./FilterField.tsx";

type TableFilterProps = {
    filters: FilterType[],
    fetchFunction: (page: number, per_page: number, queryParams: any[]) => any;
}

const TableFilter = ({filters, fetchFunction}: TableFilterProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const {control, register, handleSubmit} = useForm();
    const {fields, append, remove} = useFieldArray({
        control,
        name: "filters",
    });

    useEffect(() => {
        const handleWindowKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleWindowKeyDown);

        return () => {
            window.removeEventListener('keydown', handleWindowKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLLIElement;

            if (
                menuOpen &&
                !target.classList.contains('menu') &&
                !target.classList.contains('filter-item')
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [menuOpen]);

    const handleMenuOpen = () => {
        if (fields.length >= filters.length) {
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

        // @ts-ignore
        dispatch(fetchFunction({page: 1, per_page: 17, ...queryParams}));
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
                            className="menu absolute top-[36px] left-0 w-[164px] h-max bg-mainDarkBlue rounded-xl z-10 shadow-black shadow-sm text-white">

                            <ul>
                                {Object.values(filters).map((filter: FilterType) => {
                                    let canRender = true;
                                    fields.forEach((item: any) => {
                                        if (item.name == filter.name) {
                                            canRender = false;
                                        }
                                    })

                                    if (!canRender) return null;

                                    return (
                                        <li
                                            className="filter-item px-2 py-1 [&:not(:last-child)]:border-b-[1px] border-white hover:bg-white hover:bg-opacity-10 cursor-pointer"
                                            key={filter.name}
                                            onClick={() => handleSelectFilter(filter)}
                                        >
                                            {filter.label}
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

export default TableFilter;
