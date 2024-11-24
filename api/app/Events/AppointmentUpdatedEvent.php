<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AppointmentUpdatedEvent implements ShouldBroadcast
{
    use SerializesModels;

    public $data;
    protected $userId;

    public function __construct(array $data, string $userId)
    {
        $this->data = $data;
        $this->userId = $userId;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel("notifications.{$this->userId}"),
        ];
    }

    public function broadcastWith(): array
    {
        return $this->data;
    }
}
