<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Models\Inventory;

class EquipmentController extends Controller
{
    //Cargar objetos en uso
    public function index(Request $request)
    {
        $character = $request->user()->character()->first();

        $equipment = Equipment::where('character_id', $character->id)
            ->with('item')
            ->get();

        return response()->json($equipment);
    }

    public function equip(Request $request)
    {
        //Validar que llega el id del item
        $request->validate(['item_id' => 'required|integer']);

        $character = $request->user()->character()->first();

        $item = Inventory::where('item_id', $request->item_id)
            ->with('item')
            ->first();

        //Comprobar que tiene nivel para usar el item
        if ($character->level < $item->required_level) {
            return response()->json(["Message" => "Nivel insuficiente."]);
        }
    }
}
