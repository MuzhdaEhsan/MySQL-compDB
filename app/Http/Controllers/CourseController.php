<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Log;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json(['courses' => Course::all()]);
        }

        $resultsPerPage = $request->query('resultsPerPage') ?? 10;
        $orderBy = $request->query('orderBy') ?? 'id';
        $orderByType = $request->query('orderByType') ?? 'asc';

        $courses = Course::orderBy($orderBy, $orderByType)->paginate($resultsPerPage)->withQueryString();

        $trashedCourses = Course::onlyTrashed()->get();

        return view('courses.index', compact('courses', 'trashedCourses'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('courses.create');
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
            'course_code' => ['regex:/^[a-zA-Z]/', 'unique:courses,code', 'required'],
            'course_full_name' => ['string', 'required'],
        ]);


        $latestRecordCodeNumber = 0;

        // Get the latest record ordered by id to extract number from the code
        $latestRecord = Course::withTrashed()->orderBy('id', 'desc')->get()->first();
        if ($latestRecord) {
            $latestRecordCodeNumber = intval(substr($latestRecord->code, 1));
        }

        // Create a new course record
        $course = Course::create([
            'code' => $request->input('course_code'),
            'full_name' => $request->input('course_full_name')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::CREATE,
            'table_name' => Log::TABLE_COURSES,
            'record_id' => $course->id,
            'new_state' => $course->toJson()
        ]);

        // Add related competencies using ATTACH (add new items)
        $course->competencies()->attach($request->input('competencies') ?? []);

        if ($request->expectsJson()) {
            return response()->json(['course' => $course]);
        }

        return redirect()
        ->action(
            [CourseController::class, 'index']
        )->with(
            'status',
            "Successfully create a new course $course->code - $course->full_name"
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        return view('courses.show', compact('course'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        return view('courses.edit', compact('course'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'course_code' => ['regex:/^[a-zA-Z]/', 'required'], 
            'course_full_name' => ['string', 'required'],
        ]);

        $originalCourse = $course->toJson();

        // Create a new course record
        $course->update([
            'code' => $request->input('course_code'),
            'full_name' => $request->input('course_full_name')
        ]);

        // Log this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::UPDATE,
            'table_name' => Log::TABLE_COURSES,
            'record_id' => $course->id,
            'old_state' => $originalCourse,
            'new_state' => $course->toJson()
        ]);

        // Add related competencies using SYNC (synchronize the list)
        $course->competencies()->sync($request->input('competencies') ?? []);
       

        if ($request->expectsJson()) {
            return response()->json(['course' => $course]);
        }

        return redirect()
            ->action(
                [CourseController::class, 'index']
            )->with(
                'status',
                "Successfully updated course $course->code - $course->full_name"
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Course $course)
    {
         // Get the code and short name of this record before deleting
         $code = $course->code;
         $fullName = $course->full_name;
 
         $course->delete();
        
         // Log this event
         Log::create([
             'user_id' => $request->user()->id,
             'action' => Log::DELETE,
             'table_name' => Log::TABLE_COURSES,
             'record_id' => $course->id,
             'new_state' => $course->toJson()
         ]);
 
         // Redirect to index page with flash message
         return redirect()
             ->action(
                 [CourseController::class, 'index']
             )->with(
                 'status',
                 "Successfully deleted Course $code - $fullName"
             );
    }

    /**
     * Return trashed courses.
     */
    public function trashed()
    {
        $courses = Course::onlyTrashed()->get();
        return view('courses.trashed', compact('courses'));
    }

    /**
     * Force delete a course.
     */
    public function forceDelete(Request $request, $id)
    {
        $course = Course::onlyTrashed()->where('id', $id)->firstOrFail();
        $code = $course->code;
        $fullName = $course->full_name;

        $course->forceDelete();

        // logs this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::FORCE_DELETE,
            'table_name' => Log::TABLE_COURSES,
            'record_id' => $course->id,
            'new_state' => $course->toJson()
        ]);

        return back()->with(
            'status',
            "Successfully force deleted Course $code - $fullName"
        );
    }

    /**
     * Restore a course.
     */
    public function restore(Request $request, $id)
    {
        $course = Course::onlyTrashed()->where('id', $id)->firstOrFail();

        $course->restore();

        // logs this event
        Log::create([
            'user_id' => $request->user()->id,
            'action' => Log::RESTORE,
            'table_name' => Log::TABLE_COURSES,
            'record_id' => $course->id,
            'new_state' => $course->toJson()
        ]);

        return back()->with(
            'status',
            "Successfully restored Course $course->code - $course->full_name"
        );
    }
}
