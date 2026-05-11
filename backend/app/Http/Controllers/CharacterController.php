<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CharacterController extends Controller
{
    //Devuelve el pj del usuario
    public function show(Request $request)
    {
        $character = $request->user()->character()->first();

        return response()->json($character);
    }
}
