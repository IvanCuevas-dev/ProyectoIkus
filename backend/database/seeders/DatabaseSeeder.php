<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Character;
use App\Models\Item;
use App\Models\Inventory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\ItemSeeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['name' => 'Admin'],
            [
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin1234'),
                'role' => 'admin',
            ]
        );

        Character::updateOrCreate(
            ['user_id' => $admin->id],
            ['name' => $admin->name]
        );

        $user = User::updateOrCreate(
            ['name' => 'Usuario'],
            [
                'email' => 'usuario@usuario.com',
                'password' => Hash::make('usuario1234'),
                'role' => 'user',
            ]
        );

        Character::updateOrCreate(
            ['user_id' => $user->id],
            ['name' => $user->name]
        );

        $this->call(ItemSeeder::class);

        $character = Character::where('user_id', $admin->id)->first();

        foreach (Item::all() as $item) {
            Inventory::updateOrCreate(
                ['character_id' => $character->id, 'item_id' => $item->id],
                ['quantity' => 2]
            );
        }
    }
}
