<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('name');
            $table->string('dosage')->nullable();
            $table->decimal('concentration', 5, 2)->nullable(); // Concentration of the active ingredient
            $table->integer('quantity');
            $table->date('expiration_date');
            $table->string('manufacturer')->nullable();
            $table->string('batch_number')->nullable();
            $table->decimal('price', 8, 2);
            $table->unsignedBigInteger('category_id');
            $table->text('prescription')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('medicine_categories')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
