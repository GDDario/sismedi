import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {hideMessage} from "../../store/messageSlice.ts";
import MessageBody from "./MessageBody.tsx";

const Message = () => {
    const {message, type, duration} = useSelector((state: any) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(hideMessage());
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <MessageBody type={type} text={message} duration={duration}/>
    );
};

export default Message;