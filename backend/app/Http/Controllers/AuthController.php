<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Character;


class AuthController extends Controller
{
    //Registro
    function register(RegisterRequest $request)
    {
        //Crear usuario
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password,
        ]);

        //Crear personaje vinculado al usuario
        Character::create([
            'user_id' => $user->id,
            'name'    => $user->name,
        ]);

        //Generar token
        $token = $user->createToken('auth_token')->plainTextToken;

        //Devolver datos
        return response()->json([
            'user' => [
                'id'   => $user->id,
                'name' => $user->name,
                'role' => $user->role,
            ],
            'token' => $token
        ]);
    }


    //Login
    function login(LoginRequest $request)
    {
        // Verificar credenciales
        if (!Auth::attempt($request->only('name', 'password'))) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        //Comprobar si el usuario está baneado
        if ($user->banned) {
            return response()->json(['message' => 'Tu cuenta ha sido suspendida.'], 403);
        }

        //Generar token
        $token = $user->createToken('auth_token')->plainTextToken;

        //Devolver datos
        return response()->json([
            'user' => [
                'id'   => $user->id,
                'name' => $user->name,
                'role' => $user->role,
            ],
            'token' => $token
        ]);
    }
}
