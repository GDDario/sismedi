import React, {useEffect, useMemo, useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, PaginationState, useReactTable} from "@tanstack/react-table";
// @ts-ignore
import {TDataPatientsMock} from "../../../../../.jest/mocks/patientsMock.ts";
import EditButton from "./EditButton.tsx";
import EditPatientModal from "./EditPatientModal.tsx";
import AppointsButton from "./AppointsButton.tsx";
import {format} from "date-fns";
import {OpenModal} from "../../types.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchPatients} from "../../store/patientsSlice.ts";

const columnHelper = createColumnHelper();

const PatientsTable = () => {
    const [openEditModal, setOpenEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [openAppointsModal, setOpenAppointsModal] = useState<OpenModal>({open: false, uuid: undefined});
    const dispatch = useDispatch();
    const patientsData = useSelector((state: any) => state.patients)

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPatients({page: 1}));

        setTimeout(() => {
            // @ts-ignore
            dispatch(fetchPatients({page: 2}));
        }, 3000);
    }, []);

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

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
        columnHelper.accessor('created_at', {
            header: 'Data de cadastro',
            cell: info => format(info.getValue(), 'd/MM/y H:m'),
        }),
        columnHelper.accessor('action', {
            header: 'Ações',
            cell: info => {
                // @ts-ignore
                const uuid = info.row.original.uuid; // Pega o UUID da linha atual

                return (
                    <>
                        <EditButton onClick={() => {
                            console.log('Clicou');
                            setOpenEditModal({open: true, uuid});
                        }}/>
                        <AppointsButton onClick={() => setOpenAppointsModal({open: true, uuid})}/>
                    </>
                );
            }
        }),
    ], []);

    const table = useReactTable({
        // @ts-ignore
        columns,
        data: patientsData.data,
        getCoreRowModel: getCoreRowModel(),
        state: {
            pagination
        },
        onPaginationChange: setPagination,
        manualPagination: true
    });

    const closeEditModal = () => {
        setOpenEditModal({uuid: undefined, open: false});
    }

    if (patientsData.loading) return <div>Loading...</div>;
    if (patientsData.error) return <div>Error: {patientsData.error}</div>;

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
                </tbody>
            </table>

            <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
          </strong>
        </span>
            <span className="flex items-center gap-1">
          | Go to page:
          <input
              type="number"
              min="1"
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
          />
        </span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>

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
