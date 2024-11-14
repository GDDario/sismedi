import {useEffect, useState} from "react";
import {NumberUtil} from "../../../util/NumberUtil.ts";

const DigitalClock = () => {
    const [date, setDate] = useState<string | undefined>(undefined);
    const [hours, setHours] = useState<string | undefined>(undefined);

    useEffect(() => {
        runClock();

        setInterval(() => {
            runClock();
        }, 1000);
    }, []);

    const runClock = () => {
        const date = new Date();
        const day = NumberUtil.pad(date.getDate());
        const month = NumberUtil.pad(date.getMonth() + 1);
        const year = date.getFullYear();
        const hours = NumberUtil.pad(date.getHours());
        const minutes = NumberUtil.pad(date.getMinutes());
        const seconds = NumberUtil.pad(date.getSeconds());

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