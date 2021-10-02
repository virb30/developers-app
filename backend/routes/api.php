<?php

use App\Http\Controllers\DevelopersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('/developers')
    ->name('api.developers')
    ->group(function () {
        Route::get('/', [DevelopersController::class, 'index'])->name('.list');
        Route::get('/{developer}', [DevelopersController::class, 'show'])->name('.show');
        Route::post('/', [DevelopersController::class, 'store'])->name('.store');
        Route::put('/{developer}', [DevelopersController::class, 'update'])->name('.update');
        Route::delete('/{developer}', [DevelopersController::class, 'destroy'])->name('.delete');
    });
