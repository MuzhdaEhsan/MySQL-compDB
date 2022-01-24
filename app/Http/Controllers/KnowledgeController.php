<?php

namespace App\Http\Controllers;

use App\Models\Knowledge;
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

        return view('knowledge.index', compact('knowledge'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $latestRecord = Knowledge::orderBy('id', 'desc')->first();
        if ($latestRecord) {
            $latestRecordCodeNumber = intval(substr($latestRecord->code, 1));
        }

        // Create a new knowledge record
        $knowledge = Knowledge::create([
            'code' => 'S' . sprintf('%04d', $latestRecordCodeNumber + 1),
            'short_name' => $request->input('knowledge_short_name'),
            'statement' => $request->input('knowledge_short_name')
        ]);

        if ($request->expectsJson()) {
            return response()->json(['knowledge' => $knowledge]);
        }
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Knowledge  $knowledge
     * @return \Illuminate\Http\Response
     */
    public function destroy(Knowledge $knowledge)
    {
        //
    }
}
