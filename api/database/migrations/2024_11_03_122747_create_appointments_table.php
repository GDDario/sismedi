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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('consultation_type_id');
            $table->text('patient_description')->nullable();
            $table->date('patient_desired_date')->nullable();
            $table->dateTime('appointment_date')->nullable();
            $table->unsignedBigInteger('doctor_id')->nullable();
            $table->dateTime('doctor_assigned_at')->nullable();
            $table->boolean('canceled')->default(false);
            $table->string('canceled_reason')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('consultation_type_id')->references('id')->on('consultation_types')->onDelete('cascade');
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
