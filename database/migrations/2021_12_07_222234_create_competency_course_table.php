<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompetencyCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competency_course', function (Blueprint $table) {
            $table->unsignedBigInteger('competency_id');
            $table->unsignedBigInteger('course_id');

            $table->foreign('competency_id')->references('id')->on('competencies');
            $table->foreign('course_id')->references('id')->on('courses');

            $table->primary(['competency_id', 'course_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('competency_course');
    }
}
