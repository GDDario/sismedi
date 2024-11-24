import Pusher from "pusher-js";

class WebSocketConfig {
    private id: string;
    private callback: Function;
    private client: Pusher | null;
    private channel: Pusher.Channel | null;

    constructor(id: string, callback: Function) {
        this.id = id;
        this.callback = callback;

        this.client = null;
        this.channel = null;

        this.connectPusher();
    }

    private connectPusher() {
        this.client = new Pusher("app-key", {
            wsHost: "127.0.0.1",
            wsPort: 6001,
            forceTLS: false,
            encrypted: true,
            disableStats: true,
            enabledTransports: ["ws"],
            cluster: "mt1",
            // authEndpoint: "/broadcasting/auth",
            // auth: {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("jwt_access_token") || ""}`,
            //     },
            // },
        });
    }

    subscribe() {
        if (!this.client) {
            console.error("Pusher não está inicializado.");
            return;
        }

        const channelName = `notifications.${this.id}`;
        this.channel = this.client.subscribe(channelName);

        this.channel.bind("App\\Events\\AppointmentUpdatedEvent", this.notificationEvent);
    }

    unsubscribe() {
        if (this.channel) {
            this.channel.unbind_all();
            this.channel.unsubscribe();
            this.channel = null;
        }

        if (this.client) {
            this.client.disconnect();
            this.client = null;
        }
    }

    private notificationEvent = (data: any) => {
        if (typeof this.callback === "function") {
            this.callback(data);
        } else {
            console.warn("Callback não definido ou não é uma função.");
        }
    };
}

export default WebSocketConfig;