import {useEffect, useMemo, useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {OpenModal} from "../../../doctors/types.ts";
import {useDispatch, useSelector} from "react-redux";
import ConfirmationMessage from "../../../../shared-components/ConfirmationMessage/ConfirmationMessage.tsx";
import AssistantsTablePagination from "./AppointmentsTablePagination.tsx";
import {showMessage} from "../../../../store/messageSlice.ts";
import {fetchAppointments} from "../../store/appointmentsSlice.ts";
import EditButton from "../../../../shared-components/Table/EditButton.tsx";
import DeleteButton from "../../../../shared-components/Table/DeleteButton.tsx";
import {AppointmentService} from "../../services/AppointmentService.ts";
import {DateUtil} from "../../../../util/DateUtil.ts";

const columnHelper = createColumnHelper();

const AppointmentsTable = () => {
    const [editModal, setEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [deleteModal, setDeleteModal] = useState<OpenModal>({open: false, uuid: undefined});
    const assistantsState = useSelector((state: any) => state.appointments);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchAppointments({page: 1, per_page: 17}));
    }, []);

    const columns = useMemo(() => [
        columnHelper.accessor('uuid', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('patient_name', {
            header: 'Paciente',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('doctor_name', {
            header: 'Médico',
            cell: info => info.getValue() ?? '-',
        }),
        columnHelper.accessor('patient_desired_date', {
            header: 'Desejada',
            cell: info => DateUtil.formatValidDate(info.getValue()) ?? '-'
        }),
        columnHelper.accessor('appointment_date', {
            header: 'Data marcada',
            cell: info => DateUtil.formatValidDate(info.getValue()) ?? '-'
        }),
        columnHelper.accessor('created_at', {
            header: 'Criação do registro',
            cell: info => DateUtil.formatValidDate(info.getValue()) ?? '-'

        }),
        columnHelper.accessor('action', {
            header: 'Ações',
            cell: info => {
                // @ts-ignore
                const uuid = info.row.original.uuid; // Pega o UUID da linha atual

                return (
                    <>
                        <EditButton onClick={() => setEditModal({open: true, uuid})}/>
                        <DeleteButton onClick={() => setDeleteModal({open: true, uuid})}/>
                    </>
                );
            }
        })
    ], []);

    const table = useReactTable({
        // @ts-ignore
        columns,
        data: assistantsState.data.data,
        getCoreRowModel: getCoreRowModel(),
    });

    const deleteAssistant = async (): Promise<void> => {
        await AppointmentService.delete(deleteModal.uuid!);

        dispatch(showMessage({message: 'Assistente excluído com sucesso!', type: 'success'}));
        // @ts-ignore
        dispatch(fetchAppointments({page: 1, per_page: 17}));
        setDeleteModal({open: false, uuid: undefined});
    }

    if (assistantsState.error) return <div>Error: {assistantsState.error}</div>;

    return (
        <section>
            <div className="w-full">
                <div className="relative h-[631px]">
                    {assistantsState.loading && (<div
                        className="absolute top-0 left-0 bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
                        <span className="font-bold text-white">Carregando...</span>
                    </div>)}
                    <table>
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="text-start">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <AssistantsTablePagination/>

                {/*{editModal.open && (*/}
                {/*    <EditAssistantModal*/}
                {/*        uuid={editModal.uuid!}*/}
                {/*        visible={editModal.open}*/}
                {/*        onClose={() => setEditModal({uuid: undefined, open: false})}*/}
                {/*    />*/}
                {/*)}*/}

                <ConfirmationMessage
                    title="Excluir agendamento de consulta"
                    loading={false}
                    onConfirm={deleteAssistant}
                    onCancel={() => setDeleteModal({uuid: undefined, open: false})}
                    visible={deleteModal.open}
                    onClose={() => setDeleteModal({uuid: undefined, open: false})}
                >
                    Tem <b>certeza</b> que deseja excluir esse agendamento do sistema? Essa ação <b>não</b> poderá ser
                    desfeita.
                </ConfirmationMessage>
            </div>
        </section>
    );
};

export default AppointmentsTable;