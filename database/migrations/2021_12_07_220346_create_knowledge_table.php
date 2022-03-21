<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateKnowledgeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('knowledge', function (Blueprint $table) {
            $table->id();
            $table->string('code', 5)->unique();
            $table->string('short_name', 50);
            $table->text('statement')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('knowledge', function (Blueprint $table) {
            DB::statement("
            ALTER TABLE knowledge
            ADD COLUMN knowledge_index_col varchar(250) GENERATED ALWAYS AS (concat(short_name,' ',statement)) STORED;
            
            ");
            DB::statement("
            CREATE INDEX knowledge_idx ON knowledge (knowledge_index_col);
            ");
        });

        DB::statement('ALTER TABLE `knowledge` ADD FULLTEXT (knowledge_index_col)');

        /*Schema::table('knowledge', function (Blueprint $table) {
            DB::statement("
            ALTER TABLE knowledge
                ADD COLUMN knowledge_index_col tsvector
                GENERATED ALWAYS AS (to_tsvector('simple', coalesce(code, '') || ' ' || coalesce(short_name, '') || ' ' || coalesce(statement, ''))) STORED;
            ");
            DB::statement("
            CREATE INDEX knowledge_idx ON knowledge USING GIN (knowledge_index_col);
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
        Schema::dropIfExists('knowledge');
    }
}
