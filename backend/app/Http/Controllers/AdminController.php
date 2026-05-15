<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //Devuelve la lista de todos los usuarios con su personaje
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Acceso denegado.']);
        }

        $users = User::with('character')->get();

        return response()->json($users);
    }

    //Banea a un usuario e invalida sus tokens
    public function ban(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Acceso denegado.']);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.']);
        }

        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'No puedes banearte a ti mismo.']);
        }

        $user->banned = true;
        $user->save();

        //Elimina todos los tokens del usuario para forzar el logout
        $user->tokens()->delete();

        return response()->json(['message' => 'Usuario baneado correctamente.']);
    }

    //Desbanea a un usuario
    public function unban(Request $request, $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Acceso denegado.']);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado.']);
        }

        $user->banned = false;
        $user->save();

        return response()->json(['message' => 'Usuario desbaneado correctamente.']);
    }
}
