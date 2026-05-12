<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\EquipmentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/character', [CharacterController::class, 'show']);
    Route::post('/work/start', [WorkController::class, 'start']);
    Route::post('/work/finish', [WorkController::class, 'finish']);
    Route::get('/inventory', [InventoryController::class, 'index']);
    Route::get('/equipment', [EquipmentController::class, 'index']);
    Route::post('/equipment/equip', [EquipmentController::class, 'equip']);
    Route::delete('/equipment/unequip/{slot}', [EquipmentController::class, 'unequip']);
});
