<?php

namespace App\Services;

use App\DTO\CreateAssistantDTO;
use App\DTO\UpdateAssistantDTO;
use App\Exceptions\NotFoundException;
use App\Models\Assistant;
use App\Repositories\AssistantRepository;
use App\Util\PaginationUtil;
use Illuminate\Http\Response;

class AssistantService
{
    public function __construct(
        private AssistantRepository $repository
    )
    {

    }

    public function list(array $parameters): Response
    {
        $paginator = $this->repository->paginate($parameters);

        $pageData = PaginationUtil::extractData($paginator);

        return new Response($pageData, Response::HTTP_OK);
    }

    public function getByUuid(string $uuid): Response
    {
        try {
            $assistant = $this->repository->findByUuid($uuid);

            $assistantData = $this->arrangeAssistantData($assistant);

            return new Response(['data' => $assistantData], Response::HTTP_OK);
        } catch (NotFoundException $e) {
            return new Response(['message' => 'Assistant not found.'], Response::HTTP_NOT_FOUND);
        }
    }

    // TODO: Implement level check on assistants
    public function create(CreateAssistantDTO $dto): Response
    {
        $assistant = $this->repository->insert($dto);

        if (is_null($assistant)) {
            return new Response(['message' => 'Could not create the assistant.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } else {
            return new Response($this->arrangeAssistantData($assistant), Response::HTTP_OK);
        }
    }

    public function update(UpdateAssistantDTO $dto): Response
    {
        try {
            $assistant = $this->repository->update($dto);

            if (is_null($assistant)) {
                return new Response(['message' => 'Could not update the assistant.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            } else {
                return new Response($this->arrangeAssistantData($assistant), Response::HTTP_OK);
            }
        } catch (NotFoundException $e) {
            return new Response(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    private function arrangeAssistantData(Assistant $assistant): array
    {
        return [
            'uuid' => $assistant->uuid,
            'name' => $assistant->user->name,
            'email' => $assistant->user->email,
            'cpf' => $assistant->user->cpf,
            'level' => $assistant->level,
            'email_verified_at' => $assistant->user->email_verified_at,
            'created_at' => $assistant->created_at,
            'updated_at' => $assistant->updated_at,
            'deleted_at' => $assistant->deleted_at
        ];
    }
}

