<?php

namespace App\Enum;

enum AppointmentNotificationType: string
{
    case CANCELED = 'canceled';
    case UPDATED = 'updated';
    case ARRIVED = 'arrived';
}
