<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompetencyKnowledgeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competency_knowledge', function (Blueprint $table) {
            $table->unsignedBigInteger('competency_id');
            $table->unsignedBigInteger('knowledge_id');

            $table->foreign('competency_id')->references('id')->on('competencies');
            $table->foreign('knowledge_id')->references('id')->on('knowledge');

            $table->primary(['competency_id', 'knowledge_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('competency_knowledge');
    }
}
