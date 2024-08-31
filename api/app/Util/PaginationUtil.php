<?php

namespace App\Util;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PaginationUtil
{
    public static function extractData(LengthAwarePaginator $paginator): array
    {
        return [
            'data' => $paginator->items(),
            'currentPage' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'lastPage' => $paginator->lastPage(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem()
        ];
    }
}
