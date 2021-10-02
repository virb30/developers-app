<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class DeveloperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['string', 'required'],
            'birth_date' => ['required', 'date:Y-m-d'],
            'gender' => ['string', 'required', 'in:M,m,F,f'],
            'hobby' => ['string', 'required']
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['errors' => $validator->errors()], 400);
        throw new ValidationException($validator, $response);
    }
}
