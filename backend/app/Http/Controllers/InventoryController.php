<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    //Devuelve el inventario y los items del personaje
    public function index(Request $request)
    {

        $character = $request->user()->character()->first();

        if (!$character) {
            return response()->json(['message' => 'Personaje no encontrado'], 404);
        }

        $inventory = Inventory::where('character_id', $character->id)
            ->with('item')
            ->get();

        return response()->json($inventory);
    }
}
