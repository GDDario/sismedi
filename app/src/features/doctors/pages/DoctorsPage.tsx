import {setTitle} from "../../../store/pageSlice.ts";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

type DoctorsPageProps = {};
const DoctorsPage = ({}: DoctorsPageProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Gerenciar médicos'));
    }, []);

    return (
        <div>Doctors page</div>
    );
};

export default DoctorsPage;