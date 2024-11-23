import Pusher from 'pusher-js';

class WebSocketConfig {
    private id: any;
    private callback: any;
    private client: null;
    private channel: null;

    constructor(id, callback) {
        this.id = id;
        this.callback = callback;

        this.client = null;
        this.channel = null;

        this.connectPusher();

    }

    connectPusher() {
        this.client = new Pusher("app-key", {
            wsHost: "127.0.0.1",
            wsPort: 6001,
            forceTLS: false,
            encrypted: true,
            disableStats: true,
            enabledTransports: ["ws"],
            cluster: "mt1",
        });
    }

    subscribe() {
        this.channel = this.client.subscribe(`notification`);
        this.channel.bind("App\\Events\\AppointmentUpdatedEvent", this.notificationEvent);
    }

    unsubscribe() {
        if (this.client) {
            this.client.unsubscribe('notification');
            this.client.disconnect();
        }

        if (this.channel) {
            this.channel.unsubscribe();
            this.channel.unbind_all();
        }
    }

    notificationEvent = (data) => {
        this.callback(data);
    }

}

export default WebSocketConfig;