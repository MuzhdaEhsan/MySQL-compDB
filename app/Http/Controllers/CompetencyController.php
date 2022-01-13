<?php

namespace App\Http\Controllers;

use App\Models\Competency;
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
        dd($request->all());
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
        //
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
        //
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
