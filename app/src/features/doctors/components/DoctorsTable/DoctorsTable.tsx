import {useEffect, useMemo, useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
// @ts-ignore
import {doctor} from "../../../../../.jest/mocks/doctorsMock.ts";
import EditButton from "./EditButton.tsx";
import EditDoctorModal from "../EditDoctorModal/EditDoctorModal.tsx";
import AppointsButton from "./AppointsButton.tsx";
import {format, isValid} from "date-fns";
import {OpenModal} from "../../types.ts";
import {useDispatch, useSelector} from "react-redux";
import DoctorsTablePagination from "./DoctorsTablePagination.tsx";
import {fetchDoctors} from "../../store/doctorsSlice.ts";
import ConfirmationMessage from "../../../../shared-components/ConfirmationMessage/ConfirmationMessage.tsx";
import DeleteButton from "../../../../shared-components/DeleteButton.tsx";
import {DoctorService} from "../../services/DoctorService.ts";
import {showMessage} from "../../../../store/messageSlice.ts";

const columnHelper = createColumnHelper();

const DoctorsTable = () => {
    const [editModal, setEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [openAppointsModal, setOpenAppointsModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [deleteModal, setDeleteModal] = useState<OpenModal>({open: false, uuid: undefined});
    const dispatch = useDispatch();
    const doctorsState = useSelector((state: any) => state.doctors);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchDoctors({page: 1, per_page: 17}));
    }, []);

    const deleteDoctor = async (): Promise<void> => {
        await DoctorService.delete(deleteModal.uuid!);

        dispatch(showMessage({message: 'Doctor deleted successfully!', type: 'success'}));
        // @ts-ignore
        dispatch(fetchDoctors({page: 1, per_page: 17}));
        setDeleteModal({open: false, uuid: undefined});
    }

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
                            setEditModal({open: true, uuid});
                        }}/>
                        <AppointsButton onClick={() => setOpenAppointsModal({open: true, uuid})}/>
                        <DeleteButton onClick={() => setDeleteModal({open: true, uuid})}/>
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

                {editModal.open && (
                    <EditDoctorModal
                        uuid={editModal.uuid!}
                        visible={editModal.open}
                        onClose={() => setEditModal({uuid: undefined, open: false})}
                    />
                )}

                <ConfirmationMessage
                    title="Excluir médico"
                    loading={false}
                    onConfirm={() => deleteDoctor()}
                    onCancel={() => setDeleteModal({uuid: undefined, open: false})}
                    visible={deleteModal.open}
                    onClose={() => setDeleteModal({uuid: undefined, open: false})}
                >
                    Tem <b>certeza</b> que deseja excluir esse paciente? Essa ação <b>não</b> poderá ser desfeita.
                </ConfirmationMessage>
            </div>
        </section>
    );
}

export default DoctorsTable;
