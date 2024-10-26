<?php

namespace App\Http\Controllers;

use App\DTO\CreateMedicineDTO;
use App\DTO\UpdateMedicineDTO;
use App\Http\Requests\CreateMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Services\MedicineService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedicineController extends Controller
{
    public function __construct(
        private MedicineService $service
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

    public function update(UpdateMedicineRequest $request): Response
    {
        return $this->service->update(
            new UpdateMedicineDTO(
                uuid: $request->route('uuid'),
                name: $request->get('name'),
                quantity: $request->get('quantity'),
                expirationDate: $request->get('expiration_date'),
                manufacturer: $request->get('manufacturer'),
                batchNumber: $request->get('batch_number'),
                price: $request->get('price'),
                categoryUuid: $request->get('category_uuid'),
                dosage: $request->get('dosage'),
                concentration: $request->get('concentration'),
                prescription: $request->get('prescription'),
                description: $request->get('description')
            )
        );
    }

    public function create(CreateMedicineRequest $request): Response
    {
        return $this->service->create(
            new CreateMedicineDTO(
                name: $request->get('name'),
                quantity: $request->get('quantity'),
                expirationDate: $request->get('expiration_date'),
                manufacturer: $request->get('manufacturer'),
                batchNumber: $request->get('batch_number'),
                price: $request->get('price'),
                categoryUuid: $request->get('category_uuid')
            )
        );
    }

    public function delete(Request $request)
    {
        return new Response(null, Response::HTTP_SERVICE_UNAVAILABLE);
    }
}
