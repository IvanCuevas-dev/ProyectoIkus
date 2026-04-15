<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'name',
        'level',
        'experience',
        'gold',
        'health',
        'attack',
        'defense',
        'work_started_at',
        'work_ends_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }

    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

    public function equippedItems()
    {
        return $this->belongsToMany(Item::class, 'equipment')->withPivot('slot');
    }
}
