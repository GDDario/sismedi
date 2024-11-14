import {useEffect, useMemo, useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {OpenModal} from "../../../doctors/types.ts";
import {useDispatch, useSelector} from "react-redux";
import ConfirmationMessage from "../../../../shared-components/ConfirmationMessage/ConfirmationMessage.tsx";
import AssistantsTablePagination from "./AssistantsTablePagination.tsx";
import {showMessage} from "../../../../store/messageSlice.ts";
import {fetchAssistants} from "../../store/assistantsSlice.ts";
import EditAssistantModal from "../EditAssistantModal/EditAssistantModal.tsx";
import EditButton from "../../../../shared-components/Table/EditButton.tsx";
import DeleteButton from "../../../../shared-components/Table/DeleteButton.tsx";
import {AssistantService} from "../../services/AssistantService.ts";
import {DateUtil} from "../../../../util/DateUtil.ts";

const columnHelper = createColumnHelper();

const AssistantsTable = () => {
    const [editModal, setEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [deleteModal, setDeleteModal] = useState<OpenModal>({open: false, uuid: undefined});
    const assistantsState = useSelector((state: any) => state.assistants);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchAssistants({page: 1, per_page: 17}));
    }, []);

    const columns = useMemo(() => [
        columnHelper.accessor('uuid', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: 'Nome',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cpf', {
            header: 'CPF',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('level', {
            header: 'Nível',
            cell: info => info.getValue(),
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
        await AssistantService.delete(deleteModal.uuid!);

        dispatch(showMessage({message: 'Assistente excluído com sucesso!', type: 'success'}));
        // @ts-ignore
        dispatch(fetchAssistants({page: 1, per_page: 17}));
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

                {editModal.open && (
                    <EditAssistantModal
                        uuid={editModal.uuid!}
                        visible={editModal.open}
                        onClose={() => setEditModal({uuid: undefined, open: false})}
                    />
                )}

                <ConfirmationMessage
                    title="Excluir assistente"
                    loading={false}
                    onConfirm={deleteAssistant}
                    onCancel={() => setDeleteModal({uuid: undefined, open: false})}
                    visible={deleteModal.open}
                    onClose={() => setDeleteModal({uuid: undefined, open: false})}
                >
                    Tem <b>certeza</b> que deseja excluir esse assistente do sistema? Essa ação <b>não</b> poderá ser
                    desfeita.
                </ConfirmationMessage>
            </div>
        </section>
    );
};

export default AssistantsTable;