<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->text('full_name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('courses', function (Blueprint $table) {
            DB::statement("
            ALTER TABLE courses
                ADD COLUMN courses_index_col tsvector
                           GENERATED ALWAYS AS (to_tsvector('simple', coalesce(code, '') || ' ' || coalesce(full_name, ''))) STORED;
            ");
            DB::statement("
            CREATE INDEX courses_idx ON courses USING GIN (courses_index_col);
            ");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
