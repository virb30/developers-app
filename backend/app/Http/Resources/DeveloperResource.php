<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeveloperResource extends JsonResource
{
    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'birthDate' => $this->birth_date,
            'age' => $this->age,
            'gender' => $this->gender,
            'hobby' => $this->hobby
        ];
    }
}
