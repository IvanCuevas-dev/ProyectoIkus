<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Character;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
    }
}
