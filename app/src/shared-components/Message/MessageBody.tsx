import {IoCloseCircleOutline} from "react-icons/io5";
import {FaRegCircleCheck} from "react-icons/fa6";
import {IoMdInformationCircleOutline} from "react-icons/io";
import {ReactNode} from "react";
import Loader from "./Loader/Loader.tsx";

type props = {
    type: 'success' | 'error' | 'info';
    text: string;
    duration: number;
};

const MessageBody = ({type, text, duration}: props) => {
    const textType = (): string => {
        if (type == "success") {
            return "Successo";
        }

        if (type == "error") {
            return "Erro";
        }

        return "Informação";
    }

    const classNames = (): string => {
        let styles: string = 'flex items-center shadow-md rounded-t-[4px] py-1 pl-1 pr-3 duration-[${time}ms] animate-widthAnimation ';

        if (type == 'success') {
            styles += "bg-[#007929]";
        } else if (type == 'error') {
            styles += "bg-[#8A3434]";
        } else {
            styles += "bg-[#1A8ECF]";
        }

        return styles;
    }

    const icon = (): ReactNode => {
        if (type == 'success') {
            return <FaRegCircleCheck size={60}/>
        }

        if (type == 'error') {
            return <IoCloseCircleOutline size={60}/>;
        }

        return <IoMdInformationCircleOutline size={60}/>;
    }

    return (
        <div className="absolute right-[16px] top-[16px] z-[1000] text-white select-none">
            <div className={classNames()}>
                <div className="">
                    {icon()}
                </div>
                <div>
                    <p className="text-right text-lg font-[500]">{textType()}</p>
                    <p className="pl-3">{text}</p>
                </div>
            </div>
            <Loader duration={duration} type={type}/>
        </div>
    );
}

export default MessageBody;