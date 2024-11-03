import Button from "../../../../shared-components/Button/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import {nextPage, previousPage} from "../../store/assistantsSlice.ts";
import {AppDispatch} from "../../../../config/store.ts";

const AssistantsTablePagination = () => {
    const dispatch = useDispatch<AppDispatch>();
    const medicinesState = useSelector((state: any) => state.medicines.data);

    const handlePreviousPage = () => {
        dispatch(previousPage());
    }

    const handleNextPage = () => {
        dispatch(nextPage())
    }

    return (
        <section className="w-full flex items-center justify-end mt-2">
            <div className="flex items-center gap-2">
                <Button text='Anterior' onClick={handlePreviousPage} disabled={medicinesState.current_page <= 1}/>
                <div className="border-b-2 border-mainDarkBlue">
                    <span
                        className="font-bold">Página {medicinesState.current_page} de {medicinesState.last_page}</span>
                </div>
                <Button text='Próxima' onClick={handleNextPage}
                        disabled={medicinesState.data.current_page >= medicinesState.last_page}/>
            </div>
        </section>
    );
}

export default AssistantsTablePagination;