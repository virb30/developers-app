<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DeveloperResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nome' => $this->name,
            'datanascimento' => $this->birth_date,
            'idade' => $this->age,
            'sexo' => $this->gender,
            'hobby' => $this->hobby
        ];
    }
}
