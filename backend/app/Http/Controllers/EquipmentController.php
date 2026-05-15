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

    //Equipar objetos
    public function equip(Request $request)
    {
        //Validar el id del item
        $request->validate(['item_id' => 'required|integer']);

        //Obtener el personaje
        $character = $request->user()->character()->first();

        //Buscar el item en el inventario del personaje
        $inventoryItem = Inventory::where('item_id', $request->item_id)
            ->where('character_id', $character->id)
            ->with('item')
            ->first();

        if (!$inventoryItem) {
            return response()->json(["Message" => "El item no se encuentra en el inventario."]);
        }

        //Obtener el item
        $item = $inventoryItem->item;

        //Comprobar que tiene nivel para usar el item
        if ($character->level < $item->required_level) {
            return response()->json(["message" => "Nivel insuficiente para equipar este ítem."]);
        }

        //Buscar si ya tiene un item equipado en ese slot
        $equippedSlot = Equipment::where('character_id', $character->id)
            ->where('slot', $item->slot)
            ->with('item')
            ->first();

        //Si el mismo item ya está equipado, no hacer nada
        if ($equippedSlot && $equippedSlot->item_id === $item->id) {
            return response()->json(['message' => 'Este ítem ya está equipado.']);
        }

        //Si ya tiene un objeto equipado, restar stats, devolver al inventario y borrar del equipment
        if ($equippedSlot) {
            $character->attack -= $equippedSlot->item->attack;
            $character->defense -= $equippedSlot->item->defense;
            $character->health -= $equippedSlot->item->health;

            //Buscar item en inventario
            $existingInventory = Inventory::where('character_id', $character->id)
                ->where('item_id', $equippedSlot->item_id)
                ->first();

            if ($existingInventory) {
                $existingInventory->increment('quantity');
            } else {
                Inventory::create([
                    'character_id' => $character->id,
                    'item_id' => $equippedSlot->item_id,
                    'quantity' => 1,
                ]);
            }

            $equippedSlot->delete();
        }

        //Sumar stats del nuevo item, añadir a equipment y quitar/actualizar del inventario
        $character->attack += $item->attack;
        $character->defense += $item->defense;
        $character->health += $item->health;

        Equipment::create([
            'character_id' => $character->id,
            'item_id'      => $item->id,
            'slot'         => $item->slot,
        ]);

        if ($inventoryItem->quantity > 1) {
            $inventoryItem->decrement('quantity');
        } else {
            $inventoryItem->delete();
        }

        $character->save();

        return response()->json(['message' => 'Ítem equipado correctamente.']);
    }

    //Desequipar objetos
    public function unequip(Request $request, $slot)
    {
        $character = $request->user()->character()->first();

        //Buscar el item en equipment
        $equippedItem = Equipment::where('character_id', $character->id)
            ->where('slot', $slot)
            ->with('item')
            ->first();

        if (!$equippedItem) {
            return response()->json(['message' => 'No hay ningún ítem equipado en ese slot.']);
        }

        $character->attack -= $equippedItem->item->attack;
        $character->defense -= $equippedItem->item->defense;
        $character->health -= $equippedItem->item->health;

        //Buscar item en inventario
        $inventoryItem = Inventory::where('character_id', $character->id)
            ->where('item_id', $equippedItem->item_id)
            ->first();


        if ($inventoryItem) {
            $inventoryItem->increment('quantity');
        } else {
            Inventory::create([
                'character_id' => $character->id,
                'item_id'      => $equippedItem->item_id,
                'quantity'     => 1,
            ]);
        }

        $equippedItem->delete();
        $character->save();

        return response()->json(["Message" => "Ítem quitado correctamente."]);
    }
}
