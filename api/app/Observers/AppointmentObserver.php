<?php

namespace App\Observers;

use App\Enum\AppointmentNotificationType;
use App\Events\AppointmentUpdatedEvent;
use App\Models\Appointment;
use Carbon\Carbon;

class AppointmentObserver
{
    public function updated(Appointment $appointment)
    {
        $originalStatus = $appointment->getOriginal('canceled');
        $newStatus = $appointment->canceled;
        $appointmentDate = $appointment->appointment_date;
        $formattedDate = null;
        $type = $originalStatus != $newStatus ?
            AppointmentNotificationType::CANCELED->value :
            AppointmentNotificationType::UPDATED->value;

        if ($appointmentDate) {
            $formattedDate = Carbon::createFromFormat('Y-m-d H:i:s', '2024-11-22 09:00:00');
            $formattedDate = $formattedDate->format('d/m/Y H:i');
        }

        $message = $this->generateMessage($formattedDate, $type);

        $data = [
            'type' => $type,
            'message' => $message,
            'uuid' => $appointment->uuid
        ];

        AppointmentUpdatedEvent::dispatch($data);
    }

    private function generateMessage(?string $formattedDate, string $type): string
    {
        $message = "";

        if ($type === 'canceled') {
            if (is_null($formattedDate)) {
                $message = "Atenção: informamos que a sua consulta foi cancelada!";
            } else {
                $message = "Atenção: informamos que a sua consulta, programada para $formattedDate, foi cancelada!";
            }
        } else {
            if (is_null($formattedDate)) {
                $message = "Sua consulta teve uma atualização.";
            } else {
                $message = "Sua consulta na data de $formattedDate teve uma atualização.";
            }
        }

        return $message;
    }
}
