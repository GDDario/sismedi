import {useEffect, useMemo, useState} from "react";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
// @ts-ignore
import {patientsMockData} from "../../../../../.jest/mocks/patientsMock.ts";
import EditButton from "./EditButton.tsx";
import EditPatientModal from "../EditPatientModal/EditPatientModal.tsx";
import AppointsButton from "./AppointsButton.tsx";
import {format, isValid} from "date-fns";
import {OpenModal} from "../../types.ts";
import {useDispatch, useSelector} from "react-redux";
import PatientsTablePagination from "./PatientsTablePagination.tsx";
import {fetchPatients} from "../../store/patientsSlice.ts";
import ConfirmationMessage from "../../../../shared-components/ConfirmationMessage/ConfirmationMessage.tsx";
import DeleteButton from "../../../../shared-components/DeleteButton.tsx";
import {PatientService} from "../../services/PatientService.ts";
import {showMessage} from "../../../../store/messageSlice.ts";

const columnHelper = createColumnHelper();

const PatientsTable = () => {
    const [editModal, setEditModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [openAppointsModal, setOpenAppointsModal] = useState<OpenModal>({open: false, uuid: undefined});
    const [deleteModal, setDeleteModal] = useState<OpenModal>({open: false, uuid: undefined});
    const dispatch = useDispatch();
    const patientsState = useSelector((state: any) => state.patients);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPatients({page: 1, per_page: 17}));
    }, []);

    const deletePatient = async (): Promise<void> => {
        await PatientService.delete(deleteModal.uuid!);

        dispatch(showMessage({message: 'Patient deleted successfully!', type: 'success'}));
        // @ts-ignore
        dispatch(fetchPatients({page: 1, per_page: 17}));
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
        data: patientsState.data.data,
        getCoreRowModel: getCoreRowModel(),
    });

    if (patientsState.error) return <div>Error: {patientsState.error}</div>;

    return (
        <section>
            <div className="w-full">
                <div className="relative h-[631px]">
                    {patientsState.loading && (<div
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

                <PatientsTablePagination/>

                {editModal.open && (
                    <EditPatientModal
                        uuid={editModal.uuid!}
                        visible={editModal.open}
                        onClose={() => setEditModal({uuid: undefined, open: false})}
                    />
                )}
                {/*<p>Open appoints modal to patient {openAppointsModal.uuid}</p>*/}

                <ConfirmationMessage
                    title="Excluir paciente"
                    loading={false}
                    onConfirm={() => deletePatient()}
                    onCancel={() => setDeleteModal({uuid: undefined, open: false})}
                    visible={deleteModal.open}
                    onClose={() => setDeleteModal({uuid: undefined, open: false})}
                >
                    Tem <b>certeza</b> que deseja excluir esse paciente? Essa ação <b>não</b> poderá ser desfeita.
                </ConfirmationMessage>
            </div>
        </section>
    )
        ;
}

export default PatientsTable;
