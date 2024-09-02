<?php

namespace App\Util;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PaginationUtil
{
    public static function extractData(LengthAwarePaginator $paginator): array
    {
        return [
            'data' => $paginator->items(),
            'current_page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'last_page' => $paginator->lastPage(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem()
        ];
    }
}
