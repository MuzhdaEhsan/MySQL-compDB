<?php

namespace App\Http\Controllers;

use App\Models\Competency;
use App\Models\Log;
use Illuminate\Http\Request;

class CompetencyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $resultsPerPage = $request->query('resultsPerPage') ?? 10;
        $orderBy = $request->query('orderBy') ?? 'id';
        $orderByType = $request->query('orderByType') ?? 'asc';

        $competencies = Competency::orderBy($orderBy, $orderByType)->paginate($resultsPerPage)->withQueryString();
        $trashedCompetencies = Competency::onlyTrashed()->get();

        return view('competencies.index', compact('competencies', 'trashedCompetencies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('competencies.create');
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
            'type' => ['string', 'required'],
            'short_name' => ['string', 'required'],
        ]);

        $latestRecordCodeNumber = 0;

        // Get the latest record ordered by id to extract number from the code
        $latestRecord = Competency::orderBy('id', 'desc')->first();
        if ($latestRecord) {
            $latestRecordCodeNumber = intval(substr($latestRecord->code, 1));
        }

        // Create a new competency record
        $competency = Competency::create([
            'code' => $request->input('type') . sprintf('%04d', $latestRecordCodeNumber + 1),
            'short_name' => $request->input('short_name'),
            'statement' => $request->input('statement')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::CREATE,
            'table_name' => Log::TABLE_COMPETENCIES,
            'record_id' => $competency->id,
        ]);

        // Add related skills using ATTACH (add new items)
        $competency->skills()->attach($request->input('skills') ?? []);

        if ($request->expectsJson()) {
            return response()->json(['competency' => $competency]);
        }

        return redirect()
            ->action(
                [CompetencyController::class, 'index']
            )->with(
                'status',
                "Successfully create a new Competency $competency->code - $competency->short_name"
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Competency  $competency
     * @return \Illuminate\Http\Response
     */
    public function show(Competency $competency)
    {
        return view('competencies.show', compact('competency'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Competency  $competency
     * @return \Illuminate\Http\Response
     */
    public function edit(Competency $competency)
    {
        return view('competencies.edit', compact('competency'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Competency  $competency
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Competency $competency)
    {
        $request->validate([
            'type' => ['string', 'required'],
            'short_name' => ['string', 'required'],
        ]);

        $originalCompetency = $competency->toJson();

        // Create a new competency record
        $competency->update([
            'code' => $request->type . substr($competency->code, 1),
            'short_name' => $request->input('short_name'),
            'statement' => $request->input('statement')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::UPDATE,
            'table_name' => Log::TABLE_COMPETENCIES,
            'record_id' => $competency->id,
            'old_state' => $originalCompetency,
            'new_state' => $competency->toJson()
        ]);

        // Add related skills using SYNC (synchronize the list)
        $competency->skills()->sync($request->input('skills') ?? []);

        if ($request->expectsJson()) {
            return response()->json(['competency' => $competency]);
        }

        return redirect()
            ->action(
                [CompetencyController::class, 'index']
            )->with(
                'status',
                "Successfully updated Competency $competency->code - $competency->short_name"
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Competency  $competency
     * @return \Illuminate\Http\Response
     */
    public function destroy(Competency $competency)
    {
        // Get the code and short name of this record before deleting
        $code = $competency->code;
        $shortName = $competency->short_name;

        $competency->delete();

        // TODO: logs this event

        // Redirect to index page with flash message
        return redirect()
            ->action(
                [CompetencyController::class, 'index']
            )->with(
                'status',
                "Successfully deleted Competency $code - $shortName"
            );
    }

    /**
     * Return trashed competencies.
     */
    public function trashed()
    {
        $competencies = Competency::onlyTrashed()->get();
        return view('competencies.trashed', compact('competencies'));
    }

    /**
     * Force delete a competency.
     */
    public function forceDelete($id)
    {
        $competency = Competency::onlyTrashed()->where('id', $id)->firstOrFail();
        $code = $competency->code;
        $shortName = $competency->short_name;

        $competency->forceDelete();

        // TODO: logs this event

        return back()->with(
            'status',
            "Successfully force deleted Competency $code - $shortName"
        );
    }

    /**
     * Restore a competency.
     */
    public function restore($id)
    {
        $competency = Competency::onlyTrashed()->where('id', $id)->firstOrFail();

        $competency->restore();

        // TODO: logs this event

        return back()->with(
            'status',
            "Successfully restored Competency $competency->code - $competency->short_name"
        );
    }
}
