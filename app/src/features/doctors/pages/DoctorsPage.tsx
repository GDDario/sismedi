import DoctorsTable from "../components/DoctorsTable/DoctorsTable.tsx";
import TableFilter from "../../../shared-components/Table/TableFilter.tsx";
import {DoctorsFilters} from "../constants.ts";
import {fetchDoctors} from "../store/doctorsSlice.ts";

const DoctorsPage = () => {
    return (
        <>
            <TableFilter filters={DoctorsFilters} fetchFunction={fetchDoctors}/>
            <DoctorsTable/>
        </>
    );
};

export default DoctorsPage;