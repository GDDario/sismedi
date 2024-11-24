<?php

namespace App\Services;

use App\DTO\CreateAppointmentDTO;
use App\DTO\UpdateAppointmentDTO;
use App\Exceptions\NotFoundException;
use App\Models\Appointment;
use App\Repositories\AppointmentRepository;
use App\Repositories\NotificationRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use InvalidArgumentException;

class NotificationService
{
    public function __construct(
        private NotificationRepository $repository
    )
    {

    }

    public function getNotDismised(string $userUuid): Response
    {
        return new Response(['data' => $this->repository->findNotDismised($userUuid)]);
    }

    public function markAllAsSeen(int $userId): Response {
        $this->repository->markAllAsSeen($userId);

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    public function dismissById(int $id): Response
    {
        $this->repository->markAsDismissedById($id);

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    public function dismissAll(int $userId): Response
    {
        $this->repository->markAllAsDismissed($userId);

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

    public function markAsSeen(): Response
    {
        return new Response();
    }
}
