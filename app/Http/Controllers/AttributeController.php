<?php

namespace App\Http\Controllers;



use App\Models\Attribute;
use App\Models\Log;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if ($request->expectsJson()) {
            return response()->json(['attributes' => Attribute::all()]);
        }

        $resultsPerPage = $request->query('resultsPerPage') ?? 10;
        $orderBy = $request->query('orderBy') ?? 'id';
        $orderByType = $request->query('orderByType') ?? 'asc';

        $attributes = Attribute::orderBy($orderBy, $orderByType)->paginate($resultsPerPage)->withQueryString();
        $trashedAttributes = Attribute::onlyTrashed()->get();

        return view('attributes.index', compact('attributes', 'trashedAttributes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('attributes.create');
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
            'attribute_short_name' => ['string', 'required'],
        ]);

        $latestRecordCodeNumber = 0;

        // Get the latest record ordered by id to extract number from the code
        $latestRecord = Attribute::orderBy('id', 'desc')->first();
        if ($latestRecord) {
            $latestRecordCodeNumber = intval(substr($latestRecord->code, 1));
        }

        // Create a new attribute record
        $attribute = Attribute::create([
            'code' => 'A' . sprintf('%04d', $latestRecordCodeNumber + 1),
            'short_name' => $request->input('attribute_short_name'),
            'statement' => $request->input('attribute_statement')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::CREATE,
            'table_name' => Log::TABLE_ATTRIBUTES,
            'record_id' => $attribute->id,
            'new_state' => $attribute->toJson()
        ]);

        // Add related skills using ATTACH (add new items)
        $attribute->competencies()->attach($request->input('competencies') ?? []);

        if ($request->expectsJson()) {
            return response()->json(['attribute' => $attribute]);
        }

        return redirect()
            ->action(
                [AttributeController::class, 'index']
            )->with(
                'status',
                "Successfully create a new attribute $attribute->code - $attribute->short_name"
            );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Attribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function show(Attribute $attribute)
    {
        $courses = $attribute->getCourses();
        return view('attributes.show', compact('attribute', 'courses'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function edit(Attribute $attribute)
    {
        return view('attributes.edit', compact('attribute'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Attribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attribute $attribute)
    {
        $request->validate([
            'attribute_short_name' => ['string', 'required'],
        ]);

        $originalAttribute = $attribute->toJson();

        // Create a new attribute record
        $attribute->update([
            'code' => 'A' . substr($attribute->code, 1),
            'short_name' => $request->input('attribute_short_name'),
            'statement' => $request->input('attribute_statement')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::UPDATE,
            'table_name' => Log::TABLE_ATTRIBUTES,
            'record_id' => $attribute->id,
            'old_state' => $originalAttribute,
            'new_state' => $attribute->toJson()
        ]);

        // Add related competencies using SYNC (synchronize the list)
        $attribute->competencies()->sync($request->input('competencies') ?? []);
       

        if ($request->expectsJson()) {
            return response()->json(['attribute' => $attribute]);
        }

        return redirect()
            ->action(
                [AttributeController::class, 'index']
            )->with(
                'status',
                "Successfully updated attribute $attribute->code - $attribute->short_name"
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attribute  $attribute
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Attribute $attribute)
    {
        // Get the code and short name of this record before deleting
        $code = $attribute->code;
        $shortName = $attribute->short_name;

        $attribute->delete();
       
        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::DELETE,
            'table_name' => Log::TABLE_ATTRIBUTES,
            'record_id' => $attribute->id,
            'new_state' => $attribute->toJson()
        ]);

        // Redirect to index page with flash message
        return redirect()
            ->action(
                [AttributeController::class, 'index']
            )->with(
                'status',
                "Successfully deleted Attribute $code - $shortName"
            );
    }

    /**
     * Return trashed attributes.
     */
    public function trashed()
    {
        $attributes = Attribute::onlyTrashed()->get();
        return view('attributes.trashed', compact('attributes'));
    }

    /**
     * Force delete an attribute.
     */
    public function forceDelete(Request $request, $id)
    {
        $attribute = Attribute::onlyTrashed()->where('id', $id)->firstOrFail();
        $code = $attribute->code;
        $shortName = $attribute->short_name;

        $attribute->forceDelete();

        // logs this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::FORCE_DELETE,
            'table_name' => Log::TABLE_ATTRIBUTES,
            'record_id' => $attribute->id,
            'new_state' => $attribute->toJson()
        ]);

        return back()->with(
            'status',
            "Successfully force deleted Attribute $code - $shortName"
        );
    }

    /**
     * Restore an attribute.
     */
    public function restore(Request $request, $id)
    {
        $attribute = Attribute::onlyTrashed()->where('id', $id)->firstOrFail();

        $attribute->restore();

        // logs this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::RESTORE,
            'table_name' => Log::TABLE_ATTRIBUTES,
            'record_id' => $attribute->id,
            'new_state' => $attribute->toJson()
        ]);

        return back()->with(
            'status',
            "Successfully restored Attribute $attribute->code - $attribute->short_name"
        );
    }
}
