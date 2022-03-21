<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('code', 5)->unique();
            $table->string('short_name', 50);
            $table->text('statement')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        /*Schema::table('attributes', function (Blueprint $table) {
            DB::statement("
            ALTER TABLE attributes
                ADD COLUMN attributes_index_col tsvector
                GENERATED ALWAYS AS (to_tsvector('simple', coalesce(code, '') || ' ' || coalesce(short_name, '') || ' ' || coalesce(statement, ''))) STORED;
            ");
            DB::statement("
            CREATE INDEX attributes_idx ON attributes USING GIN (attributes_index_col);
            ");
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attributes');
    }
}
