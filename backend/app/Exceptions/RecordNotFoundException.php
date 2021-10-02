<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;

class RecordNotFoundException extends Exception
{
    public function __construct($message = '')
    {
        parent::__construct($message, 404);
    }

    public function render($request)
    {
        if ($request->wantsJson()) {
            return response()->json(['error' => $this->getMessage()], Response::HTTP_NOT_FOUND);
        }

        return response($this->getMessage(), Response::HTTP_NOT_FOUND);
    }
}
