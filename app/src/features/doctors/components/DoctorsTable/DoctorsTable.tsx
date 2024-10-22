import {useEffect, useMemo, useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
// @ts-ignore
import {doctor} from "../../../../../.jest/mocks/doctorsMock.ts";
import EditButton from "./EditButton.tsx";
import EditDoctorModal from "./EditDoctorModal.tsx";
import AppointsButton from "./AppointsButton.tsx";
import {format, isValid} from "date-fns";
import {OpenModal} from "../../types.ts";
import {useDispatch, useSelector} from "react-redux";
import DoctorsTablePagination from "./DoctorsTablePagination.tsx";
import {fetchDoctors} from "../../store/doctorsSlice.ts";

const columnHelper = createColumnHelper();

const DoctorsTable = () => {
    const [openEditModal, setOpenEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [openAppointsModal, setOpenAppointsModal] = useState<OpenModal>({open: false, uuid: undefined});
    const dispatch = useDispatch();
    const doctorsState = useSelector((state: any) => state.doctors);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchDoctors({page: 1, per_page: 17}));
    }, []);

    const columns = useMemo(() => [
        columnHelper.accessor('uuid', {
            header: 'ID',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: 'Nome',
            cell: info => info.getValue() + 'Nome',
        }),
        columnHelper.accessor('cpf', {
            header: 'CPF',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('crm', {
            header: 'CRM',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('created_at', {
            header: 'Data de cadastro',
            cell: info => {
                const value = info.getValue();
                if (!isValid(value)) {
                    return value;
                }

                return format(value, 'd/MM/y H:m');
            },
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
        data: doctorsState.data.data,
        getCoreRowModel: getCoreRowModel(),
    });

    const closeEditModal = () => {
        setOpenEditModal({uuid: undefined, open: false});
    }
    
    if (doctorsState.error) return <div>Error: {doctorsState.error}</div>;

    return (
        <section>
            <div className="w-full">
                <div className="relative h-[631px]">
                    {doctorsState.loading && (<div
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

                <DoctorsTablePagination />

                {openEditModal.open && (
                    <EditDoctorModal
                        uuid={openEditModal.uuid!}
                        visible={openEditModal.open}
                        onClose={closeEditModal}
                    />
                )}
                <p>Open appoints modal to doctor {openAppointsModal.uuid}</p>
            </div>
        </section>
    );
}

export default DoctorsTable;
