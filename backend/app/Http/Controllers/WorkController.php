<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Item;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    //XP necesaria para calcular cuántos ítems dropean
    private const XP_PER_DROP = 700;
    //XP base para subir de nivel
    private const XP_PER_LEVEL = 3000;

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

        //Validar que no esté trabajando
        if ($character->work_started_at !== null) {
            return response()->json(['message' => 'El personaje ya está trabajando'], 409);
        }

        //Actualizar campos de trabajo en la BBDD
        $character->work_started_at = now();
        $character->work_ends_at = now()->addSeconds($request->duration);
        $character->save();

        //Devuelvo el pj con los cambios
        return response()->json($character);
    }

    //Finaliza el trabajo y calcula recompensas
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

        //Calcular recompensas proporcionales al tiempo trabajado
        [$xpEarned, $goldEarned] = $this->calculateRewards($character);

        //Calcular drops de ítems
        $droppedItems = $this->calculateDrops($character, $xpEarned);

        //Aplicar XP y oro al personaje
        $character->experience += $xpEarned;
        $character->gold += $goldEarned;

        //Comprobar subida de nivel
        $this->levelUp($character);

        //Limpiar campos de trabajo en la BBDD
        $character->work_started_at = null;
        $character->work_ends_at = null;
        $character->save();

        //Devolver recompensas obtenidas
        return response()->json([
            'xp_earned' => $xpEarned,
            'gold_earned' => $goldEarned,
            'items_dropped' => $droppedItems,
            'character' => $character,
        ]);
    }

    //Calcula xp y oro ganados proporcionalmente al tiempo trabajado
    private function calculateRewards($character)
    {
        //Calculo segundos trabajados
        $timeWorked = $character->work_started_at->diffInSeconds(min(now(), $character->work_ends_at));
        //Calculo duración elegida
        $durationChosen = $character->work_started_at->diffInSeconds($character->work_ends_at);
        //Calculo porcentaje de tiempo real trabajado
        $proportion = $timeWorked / $durationChosen;

        //Calculo xp y oro ganado
        $option = $this->workOptions[$durationChosen];
        $xpEarned = (int) floor($proportion * $option['xp']);
        $goldEarned = (int) floor($proportion * $option['gold']);

        return [$xpEarned, $goldEarned];
    }

    //Calcula los ítems que caen según la xp ganada y los añade al inventario
    private function calculateDrops($character, $xpEarned)
    {
        //Xp por drop y cantidad de drops
        $droppedItems = [];
        $drops = (int) floor($xpEarned / self::XP_PER_DROP);

        //Mapa que baja un nivel de rareza si no hay drop [anteriorRareza, bonusLvl]
        $rarityFallback = [
            'legendary' => ['epic', 2],
            'epic' => ['rare', 0],
            'rare' => ['common', 0],
            'common' => null,
        ];

        //Tiradas random para determinar la rareza de los items encontrados
        for ($i = 0; $i < $drops; $i++) {
            $roll = rand(1, 100);
            if ($roll <= 60) {
                $rarity = 'common';
                $levelBonus = 0;
            } elseif ($roll <= 85) {
                $rarity = 'rare';
                $levelBonus = 0;
            } elseif ($roll <= 97) {
                $rarity = 'epic';
                $levelBonus = 2;
            } else {
                $rarity = 'legendary';
                $levelBonus = 3;
            }

            //Buscar ítem aleatorio que cumpla restricción de nivel
            //Si no hay disponible en esa rareza, baja al nivel anterior
            $item = null;
            $currentRarity = $rarity;
            $currentBonus = $levelBonus;

            while (!$item && $currentRarity !== null) {
                $item = Item::where('rarity', $currentRarity)
                    ->where('required_level', '<=', $character->level + $currentBonus)
                    ->inRandomOrder()
                    ->first();

                if (!$item) {
                    $fallback = $rarityFallback[$currentRarity];
                    if ($fallback === null) break;
                    [$currentRarity, $currentBonus] = $fallback;
                }
            }

            //Si no hay ningún ítem disponible en ninguna rareza, descartar drop
            if (!$item) continue;

            //Añadir al inventario: incrementar cantidad si ya existe, crear si no
            $inventory = Inventory::where('character_id', $character->id)
                ->where('item_id', $item->id)
                ->first();

            if ($inventory) {
                $inventory->increment('quantity');
            } else {
                Inventory::create([
                    'character_id' => $character->id,
                    'item_id' => $item->id,
                    'quantity' => 1,
                ]);
            }

            $droppedItems[] = $item;
        }

        return $droppedItems;
    }

    //Subida de nivel del personaje
    private function levelUp($character)
    {
        //Sube niveles mientras la XP total supere la necesaria para el siguiente nivel
        while ($character->experience >= $character->experience_next_lvl) {
            $character->level++;
            $character->experience_next_lvl = $character->level * self::XP_PER_LEVEL;
        }
    }
}
