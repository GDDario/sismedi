import {useCallback, useEffect, useRef, useState} from "react";
import {IoNotifications} from "react-icons/io5";
import WebSocketConfig from "../../../config/WebSocketConfig.ts";
import {useSelector} from "react-redux";
import {selectUser} from "../../../features/authentication/store/userSlice.ts";
import {NotificationService} from "../../../services/NotificationService.ts";
import {MdDelete} from "react-icons/md";

const NotificationButton = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef(null);
    const user = useSelector(selectUser);
    const [notifications, setNotifications] = useState([]);


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
        if (user.uuid) {
            console.log('User uuid', user.uuid);
            getNotSeenNotifications();
            const websocketConfig = new WebSocketConfig(user.uuid, onNotificationArrived);
            websocketConfig.subscribe();

            return () => {
                websocketConfig.unsubscribe()
            }
        }
    }, [user.uuid]);

    const getNotSeenNotifications = async () => {
        const notifications = await NotificationService.getNotDismised(user.uuid);

        setNotifications(notifications.data);
    }

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

    const dismissNotification = async (id: number) => {
        await NotificationService.dismissNotification(id).then(() => {
            const newNotifications = notifications.filter((notification: any) => {
                return notification.id != id;
            })

            setNotifications(newNotifications);
        });
    }

    const dismissAll = async () => {
        await NotificationService.dismissAll().then(() => {
            setNotifications([]);
        });
    }


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
                    className="absolute w-[300px] top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-10"
                >
                    <p>Notificações</p>
                    <hr/>

                    <div className="mt-2">
                        <div className="max-h-[300px] overflow-y-auto">
                            {
                                notifications.length === 0
                                    ? (<p>Você não tem novas notificações.</p>)
                                    : notifications.map((notification: any) => {
                                        return (
                                            <div key={notification.id}>
                                                <div className="flex gap-2 items-center">
                                                    <p>{notification.data.message}</p>
                                                    <div
                                                        className="rounded-full p-1 bg-black bg-opacity-5 hover:bg-opacity-25 cursor-pointer"
                                                        onClick={() => dismissNotification(notification.id)}
                                                    >
                                                        <MdDelete size={16}/>
                                                    </div>
                                                </div>

                                                <hr className="my-1"/>
                                            </div>
                                        );
                                    })
                            }
                        </div>

                        {notifications.length !== 0 &&
                            <p className="underline cursor-pointer" onClick={dismissAll}>
                                Remover todas
                            </p>
                        }
                    </div>

                </div>
            )}
        </div>
    );
};

export default NotificationButton;
