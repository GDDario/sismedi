<?php

namespace App\Repositories;

use App\Models\Notification;
use App\Models\User;

class NotificationRepository
{
    public function findNotDismised($userUuid): array
    {
        $user = User::where('uuid', $userUuid)->first();

        $notifications = Notification::where('user_id', $user->id)
            ->where('dismised', 0)
            ->get();

        return $notifications->toArray();
    }

    public function markAsDismissedById(int $id): void
    {
        Notification::where('id', $id)->first()->update(['dismised' => 1]);
    }

    public function markAllAsDismissed(int $userId): void
    {
        Notification::where('user_id', $userId)->update(['dismised' => 1]);
    }
}
