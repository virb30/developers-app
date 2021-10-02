<?php


namespace App\Services;

use App\Exceptions\RecordNotFoundException;
use App\Models\Developer;

final class SearchDevelopersService
{
    public function execute(string $search)
    {
        $developers = Developer::when($search, function ($q, $search) {
            $q->where('name', 'like', '%' . $search . '%');
        })->paginate(15);

        if ($developers->isEmpty()) {
            throw new RecordNotFoundException('Developer not found');
        }

        return $developers;
    }
}
