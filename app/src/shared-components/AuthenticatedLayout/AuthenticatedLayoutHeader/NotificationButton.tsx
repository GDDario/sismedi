import {useCallback, useEffect, useRef, useState} from "react";
import {IoNotifications} from "react-icons/io5";
import WebSocketConfig from "../../../config/WebSocketConfig.ts";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/authentication/store/userSlice.ts";

const NotificationButton = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsPopoverOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && isPopoverOpen) {
                setIsPopoverOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPopoverOpen]);

    useEffect(() => {
        const websocketConfig = new WebSocketConfig(user.uuid, onNotificationArrived);
        websocketConfig.subscribe();

        return () => {websocketConfig.unsubscribe()}
    }, [])

    let queue = Promise.resolve();
    const onNotificationArrived = (notification) => {
        queue = queue.then(
            () =>
                new Promise((resolve) => {
                    console.log(
                        "%cNotification Soketi",
                        "background: green; color: white; font-weight: bold"
                    );
                    console.log(notification);
                    console.log(
                        "%cNotification Soketi",
                        "background: green; color: white; font-weight: bold"
                    );


                })
        );
    };

    const resolveNodesWs = useCallback((notification) => {
        // setNodes((currentNodes) => {
        //     const stateNodes = currentNodes.map((node) => {
        //         if (notification.step_id === node.id) {
        //             return {
        //                 ...node,
        //                 data: {
        //                     ...node.data,
        //                     output: { ...notification.response },
        //                 },
        //             };
        //         }
        //         return node;
        //     });
        //
        //     dispatch(
        //         addCode({
        //             nodes: stateNodes,
        //         })
        //     );
        //     return stateNodes;
        // });
    }, []);

    const togglePopover = () => {
        setIsPopoverOpen((prev) => !prev);
    };

    return (
        <div className="relative z-1000" ref={popoverRef}>
            {/* Botão de notificação */}
            <button
                className="p-2 rounded-full bg-white bg-opacity-25 hover:bg-opacity-50"
                onClick={togglePopover}
            >
                <IoNotifications color="black" size={22}/>
            </button>

            {/* Popover body */}
            {isPopoverOpen && (
                <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-4"
                >
                    <p>Notificações</p>
                    <hr/>
                    <p>Você não tem novas notificações.</p>
                </div>
            )}
        </div>
    );
};

export default NotificationButton;
