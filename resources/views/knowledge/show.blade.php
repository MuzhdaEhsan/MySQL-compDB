@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class='row justify-content-center'>
            <div class='col-12 border shadow rounded'>
                <div class="d-flex justify-content-between pt-2">
                    <p class="fs-3">{{ $knowledge->code }} - {{ $knowledge->short_name }}</p>
                    <div>
                        <a href="/knowledge/{{ $knowledge->id }}/edit" class="btn btn-success btn-sm rounded-pill">
                            <i class="fa fa-edit"></i> Edit
                        </a>
                        <a href="/knowledge/{{ $knowledge->id }}"
                            onclick="event.preventDefault(); document.getElementById('delete-form-{{ $knowledge->id }}').submit();"
                            class="btn btn-danger btn-sm rounded-pill">
                            <i class="fa fa-trash"></i> Delete
                        </a>
                        <form id="delete-form-{{ $knowledge->id }}" action="/knowledge/{{ $knowledge->id }}"
                            method="POST" class="d-none">
                            @csrf
                            @method('DELETE')
                        </form>
                    </div>
                </div>
                <p>{{ $knowledge->statement }}</p>
            </div>

            <div class='col-12 my-3'>
                <p class="bold">Related resources:</p>
                <hr />
            </div>

            <div class='col-3'>
                <p class="fs-4 text-center">Competencies</p>
                <div class="list-group">
                    @foreach ($knowledge->competencies as $competency)
                        <a href="/competencies/{{ $competency->id }}"
                            class="list-group-item list-group-item-action">{{ $competency->code }}
                            - {{ $competency->short_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-3'>
                <p class="fs-4 text-center">Courses</p>
                <div class="list-group">
                    @foreach ($courses as $course)
                        <a href="/courses/{{ $course->id }}" class="list-group-item list-group-item-action">
                            {{ $course->code }} - {{ $course->full_name }}
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection
