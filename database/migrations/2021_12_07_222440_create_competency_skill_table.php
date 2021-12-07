<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompetencySkillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competency_skill', function (Blueprint $table) {
            $table->unsignedBigInteger('competency_id');
            $table->unsignedBigInteger('skill_id');

            $table->foreign('competency_id')->references('id')->on('competencies');
            $table->foreign('skill_id')->references('id')->on('skills');

            $table->primary(['competency_id', 'skill_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('competency_skill');
    }
}
