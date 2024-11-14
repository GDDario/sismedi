import Button from "../../../../shared-components/Button/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {nextPage, previousPage} from "../../store/appointmentsSlice.ts";
import {AppDispatch} from "../../../../config/store.ts";

const AppointmentsTablePagination = () => {
    const dispatch = useDispatch<AppDispatch>();
    const appointmentsState = useSelector((state: any) => state.appointments.data);

    const handlePreviousPage = () => {
        dispatch(previousPage());
    }

    const handleNextPage = () => {
        dispatch(nextPage())
    }

    return (
        <section className="w-full flex items-center justify-end mt-2">
            <div className="flex items-center gap-2">
                <Button text='Anterior' onClick={handlePreviousPage} disabled={appointmentsState.current_page <= 1}/>
                <div className="border-b-2 border-mainDarkBlue">
                    <span
                        className="font-bold">Página {appointmentsState.current_page} de {appointmentsState.last_page}</span>
                </div>
                <Button text='Próxima' onClick={handleNextPage}
                        disabled={appointmentsState.data.current_page >= appointmentsState.last_page}/>
            </div>
        </section>
    );
}

export default AppointmentsTablePagination;