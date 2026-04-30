<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Espada de Hierro',
                'description' => 'Una espada básica forjada en hierro.',
                'type' => 'arma',
                'rarity' => 'común',
                'slot' => 'arma',
                'attack' => 5,
                'defense' => 0,
                'health' => 0,
                'image' => '/img/items/espada-hierro.gif',
                'required_level' => 1,
            ],
            [
                'name' => 'Escudo de Madera',
                'description' => 'Un escudo rudimentario hecho de madera.',
                'type' => 'armadura',
                'rarity' => 'común',
                'slot' => 'armadura',
                'attack' => 0,
                'defense' => 3,
                'health' => 0,
                'image' => '/img/items/escudo-madera.gif',
                'required_level' => 1,
            ],
            [
                'name' => 'Espada de Acero',
                'description' => 'Una espada bien forjada en acero.',
                'type' => 'arma',
                'rarity' => 'rara',
                'slot' => 'arma',
                'attack' => 12,
                'defense' => 0,
                'health' => 0,
                'image' => '/img/items/espada-acero.gif',
                'required_level' => 3,
            ],
            [
                'name' => 'Armadura de Placas',
                'description' => 'Una armadura de placas que otorga gran protección.',
                'type' => 'armadura',
                'rarity' => 'épica',
                'slot' => 'armadura',
                'attack' => 0,
                'defense' => 20,
                'health' => 50,
                'image' => '/img/items/armadura-placas.gif',
                'required_level' => 5,
            ],
            [
                'name' => 'Espada Legendaria',
                'description' => 'Una espada de poder inmenso forjada por los dioses.',
                'type' => 'arma',
                'rarity' => 'legendaria',
                'slot' => 'arma',
                'attack' => 50,
                'defense' => 0,
                'health' => 0,
                'image' => '/img/items/espada-legendaria.gif',
                'required_level' => 10,
            ],
        ];

        foreach ($items as $item) {
            Item::updateOrCreate(['name' => $item['name']], $item);
        }
    }
}
