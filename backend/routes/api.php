<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\AdminController;

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
    Route::get('/admin/users', [AdminController::class, 'index']);
    Route::post('/admin/users/{id}/ban', [AdminController::class, 'ban']);
    Route::post('/admin/users/{id}/unban', [AdminController::class, 'unban']);
});
