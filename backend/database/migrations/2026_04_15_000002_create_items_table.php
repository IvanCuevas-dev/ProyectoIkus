<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->string('type', 50)->nullable();
            $table->enum('rarity', ['common', 'rare', 'epic', 'legendary'])->default('common');
            $table->enum('slot', ['weapon', 'helmet', 'armor', 'boots', 'ring'])->nullable();
            $table->integer('attack')->default(0);
            $table->integer('defense')->default(0);
            $table->integer('health')->default(0);
            $table->string('image', 255)->nullable();
            $table->integer('required_level')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
