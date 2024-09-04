import Button from "../../../../shared-components/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {nextPage, previousPage} from "../../store/patientsSlice.ts";
import {AppDispatch} from "../../../../config/store.ts";

const PatientsTablePagination = () => {
    const ITEMS_PER_PAGE = [17, 27, 37, 47, 57];
    const dispatch = useDispatch<AppDispatch>();
    const patientsState = useSelector((state: any) => state.patients.data);

    const handlePreviousPage = () => {
        dispatch(previousPage());
    }

    const handleNextPage = () => {
        dispatch(nextPage())
    }

    return (
        <section className="w-full flex items-center justify-end mt-2">
            <div className="flex items-center gap-2">
                {/*<select
                    className="mr-2"
                    value={pageSize}
                    onChange={e => {
                        onChangeTableSize(Number(e.target.value));
                    }}
                >
                    {ITEMS_PER_PAGE.map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>*/}
                <Button text='Anterior' onClick={handlePreviousPage} disabled={patientsState.current_page <= 1}/>
                <div className="border-b-2 border-mainDarkBlue">
                    <span className="font-bold">Página {patientsState.current_page} de {patientsState.last_page}</span>
                </div>
                <Button text='Próxima' onClick={handleNextPage}
                        disabled={patientsState.data.current_page >= patientsState.last_page}/>
            </div>
        </section>
    );
}

export default PatientsTablePagination;