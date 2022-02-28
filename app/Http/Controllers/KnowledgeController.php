<?php

namespace App\Http\Controllers;

use App\Models\Knowledge;
use App\Models\Log;
use Illuminate\Http\Request;

class KnowledgeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if ($request->expectsJson()) {
            return response()->json(['aKnowledge' => Knowledge::all()]);
        }

        $resultsPerPage = $request->query('resultsPerPage') ?? 10;
        $orderBy = $request->query('orderBy') ?? 'id';
        $orderByType = $request->query('orderByType') ?? 'asc';

        $knowledge = Knowledge::orderBy($orderBy, $orderByType)->paginate($resultsPerPage)->withQueryString();
        $trashedKnowledge = Knowledge::onlyTrashed()->get();

        return view('knowledge.index', compact('knowledge', 'trashedKnowledge'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('knowledge.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'knowledge_short_name' => ['string', 'required'],
        ]);

        $latestRecordCodeNumber = 0;

        // Get the latest record ordered by id to extract number from the code
        $latestRecord = Knowledge::withTrashed()->orderBy('id', 'desc')->get()->first();
        if ($latestRecord) {
            $latestRecordCodeNumber = intval(substr($latestRecord->code, 1));
        }

        // Create a new knowledge record
        $knowledge = Knowledge::create([
            'code' => 'K' . sprintf('%04d', $latestRecordCodeNumber + 1),
            'short_name' => $request->input('knowledge_short_name'),
            'statement' => $request->input('knowledge_short_name')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::CREATE,
            'table_name' => Log::TABLE_KNOWLEDGE,
            'record_id' => $knowledge->id,
            'new_state' => $knowledge->toJson()
        ]);

        // Add related competencies using ATTACH (add new items)
        $knowledge->competencies()->attach($request->input('competencies') ?? []);

        if ($request->expectsJson()) {
            return response()->json(['knowledge' => $knowledge]);
        }

        return redirect()
        ->action(
            [KnowledgeController::class, 'index']
        )->with(
            'status',
            "Successfully create a new knowledge $knowledge->code - $knowledge->short_name"
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Knowledge  $knowledge
     * @return \Illuminate\Http\Response
     */
    public function show(Knowledge $knowledge)
    {
        $courses = $knowledge->getCourses();
        return view('knowledge.show', compact('knowledge', 'courses'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Knowledge  $knowledge
     * @return \Illuminate\Http\Response
     */
    public function edit(Knowledge $knowledge)
    {
        return view('knowledge.edit', compact('knowledge'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Knowledge  $knowledge
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Knowledge $knowledge)
    {
        $request->validate([
            'knowledge_short_name' => ['string', 'required'],
        ]);

        $originalKnowledge = $knowledge->toJson();

        // Create a new knowledge record
        $knowledge->update([
            'code' => 'K' . substr($knowledge->code, 1),
            'short_name' => $request->input('knowledge_short_name'),
            'statement' => $request->input('knowledge_statement')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::UPDATE,
            'table_name' => Log::TABLE_KNOWLEDGE,
            'record_id' => $knowledge->id,
            'old_state' => $originalKnowledge,
            'new_state' => $knowledge->toJson()
        ]);

        // Add related competencies using SYNC (synchronize the list)
        $knowledge->competencies()->sync($request->input('competencies') ?? []);
       

        if ($request->expectsJson()) {
            return response()->json(['knowledge' => $knowledge]);
        }

        return redirect()
            ->action(
                [KnowledgeController::class, 'index']
            )->with(
                'status',
                "Successfully updated knowledge $knowledge->code - $knowledge->short_name"
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Knowledge  $knowledge
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Knowledge $knowledge)
    {
        // Get the code and short name of this record before deleting
        $code = $knowledge->code;
        $shortName = $knowledge->short_name;

        $knowledge->delete();
       
        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::DELETE,
            'table_name' => Log::TABLE_KNOWLEDGE,
            'record_id' => $knowledge->id,
            'new_state' => $knowledge->toJson()
        ]);

        // Redirect to index page with flash message
        return redirect()
            ->action(
                [KnowledgeController::class, 'index']
            )->with(
                'status',
                "Successfully deleted Knowledge $code - $shortName"
            );
    }

    /**
     * Return trashed knowledge.
     */
    public function trashed()
    {
        $knowledge = Knowledge::onlyTrashed()->get();
        return view('knowledge.trashed', compact('knowledge'));
    }

    /**
     * Force delete an knowledge.
     */
    public function forceDelete(Request $request, $id)
    {
        $knowledge = Knowledge::onlyTrashed()->where('id', $id)->firstOrFail();
        $code = $knowledge->code;
        $shortName = $knowledge->short_name;

        $knowledge->forceDelete();

        // logs this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::FORCE_DELETE,
            'table_name' => Log::TABLE_KNOWLEDGE,
            'record_id' => $knowledge->id,
            'new_state' => $knowledge->toJson()
        ]);

        return back()->with(
            'status',
            "Successfully force deleted Knowledge $code - $shortName"
        );
    }

    /**
     * Restore a knowledge.
     */
    public function restore(Request $request, $id)
    {
        $knowledge = Knowledge::onlyTrashed()->where('id', $id)->firstOrFail();

        $knowledge->restore();

        // logs this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::RESTORE,
            'table_name' => Log::TABLE_KNOWLEDGE,
            'record_id' => $knowledge->id,
            'new_state' => $knowledge->toJson()
        ]);

        return back()->with(
            'status',
            "Successfully restored Knowledge $knowledge->code - $knowledge->short_name"
        );
    }
}
