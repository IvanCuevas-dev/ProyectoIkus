<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'name',
        'description',
        'type',
        'rarity',
        'slot',
        'attack',
        'defense',
        'health',
        'image',
        'required_level',
    ];

    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }
}
