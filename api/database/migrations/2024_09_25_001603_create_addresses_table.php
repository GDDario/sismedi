<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('street_address');
            $table->string('house_number')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('neighborhood');
            $table->string('postal_code'); // Also known as CEP
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('patient_id');
            $table->timestamps();

            $table->foreign('city_id')->references('id')->on('cities');
            $table->foreign('patient_id')->references('id')->on('patients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
