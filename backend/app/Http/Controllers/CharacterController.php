<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function show(Request $request)
    {
        $character = $request->user()->character()->first();

        if (!$character) {
            return response()->json(['message' => 'Personaje no encontrado'], 404);
        }

        return response()->json($character);
    }
}
