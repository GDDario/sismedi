import {useEffect, useMemo, useState} from "react";
import EditButton from "../../../../shared-components/Table/EditButton.tsx";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {OpenModal} from "../../../doctors/types.ts";
import DeleteButton from "../../../../shared-components/Table/DeleteButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchMedicines} from "../../store/medicinesSlice.ts";
import PatientsTablePagination from "../../../patients/components/PatientsTable/PatientsTablePagination.tsx";
import EditPatientModal from "../../../patients/components/EditPatientModal/EditPatientModal.tsx";
import ConfirmationMessage from "../../../../shared-components/ConfirmationMessage/ConfirmationMessage.tsx";
import MedicinesTablePagination from "./MedicinesTablePagination.tsx";

const columnHelper = createColumnHelper();

const MedicinesTable = () => {
    const [editModal, setEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [deleteModal, setDeleteModal] = useState<OpenModal>({open: false, uuid: undefined});
    const medicinesState = useSelector((state: any) => state.medicines);
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchMedicines({page: 1, per_page: 17}));
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
        columnHelper.accessor('category', {
            header: 'Categoria',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('concentration', {
            header: 'Concentração',
            cell: info => {
                const value = info.getValue() as string | undefined;

                return !value ? value : `${value.replace('.', ',')}%`;
            },
        }),
        columnHelper.accessor('quantity', {
            header: 'Quantidade',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('price', {
            header: 'Price',
            cell: info => {
                let value = `${info.getValue()}`;
                value = `${value}`;

                return `R$ ${value.replace('.', ',')}`;
            },

        }),
        columnHelper.accessor('expiration_date', {
            header: 'Data de expiração',
            cell: info => {
                const value = `${info.getValue()}`;

                return `${value.substring(8, 10)}/${value.substring(5, 7)}/${value.substring(0, 4)}`;
            },
        }),
        columnHelper.accessor('action', {
            header: 'Ações',
            cell: info => {
                const original = info.row.original as any;
                const uuid = original.uuid; // Pega o UUID da linha atual

                return (
                    <>
                        <EditButton onClick={() => setEditModal({open: true, uuid})}/>
                        <DeleteButton onClick={() => setDeleteModal({open: true, uuid})}/>
                    </>
                );
            }
        }),
    ], []);

    const table = useReactTable({
        // @ts-ignore
        columns,
        data: medicinesState.data.data,
        getCoreRowModel: getCoreRowModel(),
    });

    if (medicinesState.error) return <div>Error: {medicinesState.error}</div>;

    return (
        <section>
            <div className="w-full">
                <div className="relative h-[631px]">
                    {medicinesState.loading && (<div
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

                <MedicinesTablePagination/>

                {editModal.open && (
                    <EditPatientModal
                        uuid={editModal.uuid!}
                        visible={editModal.open}
                        onClose={() => setEditModal({uuid: undefined, open: false})}
                    />
                )}

                <ConfirmationMessage
                    title="Excluir medicamento"
                    loading={false}
                    onConfirm={() => {
                    }}
                    onCancel={() => setDeleteModal({uuid: undefined, open: false})}
                    visible={deleteModal.open}
                    onClose={() => setDeleteModal({uuid: undefined, open: false})}
                >
                    Tem <b>certeza</b> que deseja excluir esse medicamento do sistema? Essa ação <b>não</b> poderá ser desfeita.
                </ConfirmationMessage>
            </div>
        </section>
    );
};

export default MedicinesTable;