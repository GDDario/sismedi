<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function __construct(
        private readonly NotificationService $service
    )
    {
    }

    public function getNotDismised(Request $request): Response
    {
        return $this->service->getNotDismised($request->route('user_uuid'));
    }

    public function dismissById(Request $request): Response
    {
        return $this->service->dismissById($request->route('id'));
    }

    public function dismissAll(): Response
    {
        $userId = Auth::user()->id;

        return $this->service->dismissAll($userId);
    }
}
