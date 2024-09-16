import PatientsTable from "../components/PatientsTable/PatientsTable.tsx";
import PatientsTableFilter from "../components/PatientsTable/PatientsTableFilter.tsx";

const PatientsPage = () => {
    return (
        <>
            <PatientsTableFilter />
            <PatientsTable />
        </>
    );
};

export default PatientsPage;