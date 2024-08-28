import React, { useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { TDataPatientsMock } from "../../../../../.jest/mocks/patientsMock.ts";
import EditButton from "./EditButton.tsx";
import EditPatientModal from "./EditPatientModal.tsx";
import AppointsButton from "./AppointsButton.tsx";
import { format } from "date-fns";
import { OpenModal } from "../../types.ts";

const data = TDataPatientsMock;

const columnHelper = createColumnHelper();

const PatientsTable = () => {
    const [openEditModal, setOpenEditModal] = useState<OpenModal>({ open: false, uuid: undefined });
    const [openAppointsModal, setOpenAppointsModal] = useState<OpenModal>({ open: false, uuid: undefined });

    const columns = useMemo(() => [
        columnHelper.accessor('uuid', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cpf', {
            header: 'CPF',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('cns', {
            header: 'CNS',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('createdAt', {
            header: 'Data de cadastro',
            cell: info => format(info.getValue(), 'd/MM/y H:m'),
        }),
        columnHelper.accessor('action', {
            header: 'Ações',
            cell: info => {
                const uuid = info.row.original.uuid; // Pega o UUID da linha atual

                return (
                    <>
                        <EditButton onClick={() => {
                            console.log('Clicou');
                            setOpenEditModal({ open: true, uuid });
                        }} />
                        <AppointsButton onClick={() => setOpenAppointsModal({ open: true, uuid })} />
                    </>
                );
            }
        }),
    ], []);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    const closeEditModal = () => {
        setOpenEditModal({ uuid: undefined, open: false });
    }

    return (
        <section className="table-container">
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
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}{table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}{table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}{table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}{table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}</tbody>
            </table>

            {openEditModal.open && (
                <EditPatientModal
                    uuid={openEditModal.uuid!}
                    visible={openEditModal.open}
                    onClose={closeEditModal}
                />
            )}
            <p>Open appoints modal to patient {openAppointsModal.uuid}</p>
        </section>
    );
}

export default PatientsTable;
