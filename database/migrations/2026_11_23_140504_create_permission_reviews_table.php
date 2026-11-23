<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('permission_reviews', function (Blueprint $table) {
            $table->id();

            //user_id akan bagi link review untuk log in user, jadi bila user delete, review juga delete
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('permission1');
            $table->string('permission2');
            $table->string('permission3');
            $table->string('permission4');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permission_reviews');
    }
};