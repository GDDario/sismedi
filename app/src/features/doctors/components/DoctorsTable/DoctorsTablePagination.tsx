import Button from "../../../../shared-components/Button/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {nextPage, previousPage} from "../../store/doctorsSlice.ts";
import {AppDispatch} from "../../../../config/store.ts";

const DoctorsTablePagination = () => {
    const ITEMS_PER_PAGE = [17, 27, 37, 47, 57];
    const dispatch = useDispatch<AppDispatch>();
    const doctorsState = useSelector((state: any) => state.doctors.data);

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
                <Button text='Anterior' onClick={handlePreviousPage} disabled={doctorsState.current_page <= 1}/>
                <div className="border-b-2 border-mainDarkBlue">
                    <span className="font-bold">Página {doctorsState.current_page} de {doctorsState.last_page}</span>
                </div>
                <Button text='Próxima' onClick={handleNextPage}
                        disabled={doctorsState.data.current_page >= doctorsState.last_page}/>
            </div>
        </section>
    );
}

export default DoctorsTablePagination;