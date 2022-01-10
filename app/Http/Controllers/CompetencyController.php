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

        return view('competencies.index', compact('competencies'));
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
        //
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
        //
    }
}
