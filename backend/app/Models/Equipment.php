<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'character_id',
        'item_id',
        'slot',
    ];

    public function character()
    {
        return $this->belongsTo(Character::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
