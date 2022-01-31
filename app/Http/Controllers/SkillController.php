<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\Log;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json(['skills' => Skill::all()]);
        }

        $resultsPerPage = $request->query('resultsPerPage') ?? 10;
        $orderBy = $request->query('orderBy') ?? 'id';
        $orderByType = $request->query('orderByType') ?? 'asc';

        $skills = Skill::orderBy($orderBy, $orderByType)->paginate($resultsPerPage)->withQueryString();

        return view('skills.index', compact('skills'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('skills.create');
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
            'skill_short_name' => ['string', 'required'],
        ]);

        $latestRecordCodeNumber = 0;

        // Get the latest record ordered by id to extract number from the code
        $latestRecord = Skill::orderBy('id', 'desc')->first();
        if ($latestRecord) {
            $latestRecordCodeNumber = intval(substr($latestRecord->code, 1));
        }

        // Create a new skill record
        $skill = Skill::create([
            'code' => 'S' . sprintf('%04d', $latestRecordCodeNumber + 1),
            'short_name' => $request->input('skill_short_name'),
            'statement' => $request->input('skill_statement')
        ]);


        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::CREATE,
            'table_name' => Log::TABLE_SKILLS,
            'record_id' => $skill->id,
            'new_state' => $skill->toJson()
        ]);

        // Add related skills using ATTACH (add new items)
        $skill->competencies()->attach($request->input('competencies') ?? []);

        if ($request->expectsJson()) {
            return response()->json(['skill' => $skill]);
        }

        return redirect()
        ->action(
            [SkillController::class, 'index']
        )->with(
            'status',
            "Successfully create a new skill $skill->code - $skill->short_name"
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function show(Skill $skill)
    {
        $courses = $skill->getCourses();
        return view('skills.show', compact('skill', 'courses'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function edit(Skill $skill)
    {
        return view('skills.edit', compact('skill'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Skill $skill)
    {
        $request->validate([
            'skill_short_name' => ['string', 'required'],
        ]);

        $originalSkill = $skill->toJson();

        // Create a new skill record
        $skill->update([
            'code' => 'S' . substr($skill->code, 1),
            'short_name' => $request->input('skill_short_name'),
            'statement' => $request->input('skill_statement')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::UPDATE,
            'table_name' => Log::TABLE_SKILLS,
            'record_id' => $skill->id,
            'old_state' => $originalSkill,
            'new_state' => $skill->toJson()
        ]);

        // Add related competencies using SYNC (synchronize the list)
        $skill->competencies()->sync($request->input('competencies') ?? []);
       

        if ($request->expectsJson()) {
            return response()->json(['skill' => $skill]);
        }

        return redirect()
            ->action(
                [SkillController::class, 'index']
            )->with(
                'status',
                "Successfully updated skill $skill->code - $skill->short_name"
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Skill  $skill
     * @return \Illuminate\Http\Response
     */
    public function destroy(Skill $skill)
    {
        //
    }
}
