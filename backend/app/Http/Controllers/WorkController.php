<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkController extends Controller
{
    //Tabla opciones de trabajo: duración en segundos, xp y oro
    private $workOptions = [
        3600   => ['xp' => 600,   'gold' => 120],
        7200   => ['xp' => 1200,  'gold' => 240],
        10800  => ['xp' => 1800,  'gold' => 360],
        14400  => ['xp' => 2400,  'gold' => 480],
        18000  => ['xp' => 3000,  'gold' => 600],
        21600  => ['xp' => 3600,  'gold' => 720],
        25200  => ['xp' => 4200,  'gold' => 840],
        28800  => ['xp' => 4800,  'gold' => 960],
        36000  => ['xp' => 6000,  'gold' => 1200],
        43200  => ['xp' => 7200,  'gold' => 1440],
        64800  => ['xp' => 10800, 'gold' => 2160],
        86400  => ['xp' => 14400, 'gold' => 2880],
        604800 => ['xp' => 100800, 'gold' => 20160],

    ];


    //Inicia el trabajo del pj
    public function start(Request $request)
    {
        //Obtener pj
        $character = $request->user()->character()->first();
        if (!$character) {
            return response()->json(['message' => 'Personaje no encontrado'], 404);
        }

        //Validar duración 
        if (!isset($this->workOptions[$request->duration])) {
            return response()->json(['message' => 'Duración no válida'], 422);
        }

        //Validar que no esté trabajando y actualizar valores en BBDD
        if ($character->work_started_at == null) {
            $character->work_started_at = now();
            $character->work_ends_at = now()->addSeconds($request->duration);
            $character->save();
        } else {
            return response()->json(['message' => 'El personaje ya está trabajando'], 409);
        }

        //Devuelvo el pj con los cambios
        return response()->json($character);
    }

    //Finaliza el trabajo u calcula recompensas
    public function finish(Request $request)
    {
        //Obtener pj
        $character = $request->user()->character()->first();
        if (!$character) {
            return response()->json(['message' => 'Personaje no encontrado'], 404);
        }

        //Validar que esté trabajando
        if ($character->work_started_at === null) {
            return response()->json(['message' => 'El personaje no está trabajando'], 409);
        }

        //Calcular tiempo trabajado y duración elegida
        $timeWorked = $character->work_started_at->diffInSeconds(min(now(), $character->work_ends_at));
        $durationChosen = $character->work_started_at->diffInSeconds($character->work_ends_at);

        //Calcular proporción de tiempo trabajada
        $proportion = $timeWorked / $durationChosen;

        //Obtener xp y oro máximos de la opción elegida
        $option = $this->workOptions[$durationChosen];
        $xpEarned = (int) floor($proportion * $option['xp']);
        $goldEarned = (int) floor($proportion * $option['gold']);

        //Aplicar recompensas
        $character->experience += $xpEarned;
        $character->gold += $goldEarned;

        //Limpiar campos de trabajo en la BBDD
        $character->work_started_at = null;
        $character->work_ends_at = null;
        $character->save();

        //Devolver recompensas obtenidas
        return response()->json([
            'xp_earned'   => $xpEarned,
            'gold_earned' => $goldEarned,
            'character'   => $character,
        ]);
    }
}
