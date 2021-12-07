<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCompetenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competencies', function (Blueprint $table) {
            $table->id();
            $table->string('code', 5)->unique();
            $table->string('short_name', 50);
            $table->text('statement')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('competencies', function (Blueprint $table) {
            DB::statement("
            ALTER TABLE competencies
            ADD COLUMN competencies_index_col tsvector
                       GENERATED ALWAYS AS (to_tsvector('simple', coalesce(code, '') || ' ' || coalesce(short_name, '') || ' ' || coalesce(statement, ''))) STORED;
            ");
            DB::statement("
            CREATE INDEX competencies_idx ON competencies USING GIN (competencies_index_col);
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
        Schema::dropIfExists('competencies');
    }
}
