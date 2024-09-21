import {useEffect, useState} from "react";
import {pad} from "../../../util/numberUtil.ts";

const DigitalClock = () => {
    const [date, setDate] = useState<string | undefined>(undefined);
    const [hours, setHours] = useState<string | undefined>(undefined);

    useEffect(() => {
        setInterval(() => {
            runClock()
        }, 1000);
    }, []);

    const runClock = () => {
        const date = new Date();
        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        setDate(`${day}/${month}/${year}`);
        setHours(`${hours}:${minutes}:${seconds}`);
    }

    return (
        <div className="flex flex-col gap-1 text-white font-bold">
            {hours ?
                <>
                    <div>Data: <span>{date}</span></div>
                    <div>Hora: <span>{hours}</span></div>
                </>
                : <div>Carregando relógio...</div>}
        </div>
    );
}

export default DigitalClock;