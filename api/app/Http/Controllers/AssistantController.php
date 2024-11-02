<?php

namespace App\Http\Controllers;

use App\DTO\CreateAssistantDTO;
use App\DTO\UpdateAssistantDTO;
use App\Http\Requests\CreateAssistantRequest;
use App\Http\Requests\UpdateAssistantRequest;
use App\Services\AssistantService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AssistantController extends Controller
{
    public function __construct(
        private AssistantService $service
    )
    {
    }

    public function index(Request $request): Response
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 20);

        $parameters = [
            ...$request->all(),
            'page' => $page,
            'per_page' => $perPage
        ];

        return $this->service->list($parameters);
    }

    public function show(Request $request): Response
    {
        return $this->service->getByUuid($request->route('uuid'));
    }

    public function create(CreateAssistantRequest $request): Response
    {
        return $this->service->create(
            new CreateAssistantDTO(
                name: $request->get('name'),
                email: $request->get('email'),
                cpf: $request->get('cpf'),
                level: $request->get('level'),
                password: $request->get('password')
            )
        );
    }

    public function update(UpdateAssistantRequest $request): Response
    {
        return $this->service->update(
            new UpdateAssistantDTO(
                uuid: $request->route('uuid'),
                name: $request->get('name'),
                email: $request->get('email'),
                cpf: $request->get('cpf'),
                level: $request->get('level')
            )
        );
    }

    public function delete(Request $request): Response
    {
        return $this->service->delete($request->route('uuid'));
    }
}
