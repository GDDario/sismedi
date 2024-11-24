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
        });

        this.client.connection.bind("disconnected", () => {
            console.warn("Pusher desconectado. Tentando reconectar...");
            this.connectPusher();
        });

        this.client.connection.bind("error", (error: any) => {
            console.error("Erro no Pusher:", error);
        });
    }

    subscribe() {
        if (!this.client) {
            console.error("Pusher não está inicializado.");
            return;
        }

        const channelName = `notifications.${this.id}`;
        this.channel = this.client.subscribe(channelName);

        this.channel.bind("pusher:subscription_succeeded", () => {
            console.log("Inscrição bem-sucedida no canal:", channelName);
        });

        this.channel.bind("pusher:subscription_error", (status: any) => {
            console.error("Erro ao se inscrever no canal:", status);
        });

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