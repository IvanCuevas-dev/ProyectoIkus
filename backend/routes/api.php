<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WorkController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/character', [CharacterController::class, 'show']);
    Route::post('/work/start', [WorkController::class, 'start']);
    Route::post('/work/finish', [WorkController::class, 'finish']);
    Route::get('/inventory', [InventoryController::class, 'index']);
});
