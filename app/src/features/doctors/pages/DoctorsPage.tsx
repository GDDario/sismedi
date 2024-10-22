import DoctorsTable from "../components/DoctorsTable/DoctorsTable.tsx";
import DoctorsTableFilter from "../components/DoctorsTable/DoctorsTableFilter.tsx";

const DoctorsPage = () => {
    return (
        <>
            <DoctorsTableFilter />
            <DoctorsTable />
        </>
    );
};

export default DoctorsPage;