<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name', 50);
            $table->integer('level')->default(1);
            $table->integer('experience')->default(0);
            $table->integer('gold')->default(0);
            $table->integer('health')->default(100);
            $table->integer('attack')->default(10);
            $table->integer('defense')->default(5);
            $table->timestamp('work_started_at')->nullable();
            $table->timestamp('work_ends_at')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
