@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="row justify-content-center">
            <div class='col-12 border shadow rounded'>
                <div class="d-flex justify-content-between pt-2">
                    <p class="fs-3">{{ $competency->code }} - {{ $competency->short_name }}</p>
                    <div>
                        <a href="/competencies" class="btn btn-secondary btn-sm rounded-pill">
                            <i class="fa fa-list"></i> Back To List
                        </a>
                        <a href="/competencies/{{ $competency->id }}/edit" class="btn btn-success btn-sm rounded-pill">
                            <i class="fa fa-edit"></i> Edit
                        </a>
                        <a href="/competencies/{{ $competency->id }}"
                            onclick="event.preventDefault(); document.getElementById('delete-form-{{ $competency->id }}').submit();"
                            class="btn btn-danger btn-sm rounded-pill">
                            <i class="fa fa-trash"></i> Delete
                        </a>
                        <form id="delete-form-{{ $competency->id }}" action="/competencies/{{ $competency->id }}"
                            method="POST" class="d-none">
                            @csrf
                            @method('DELETE')
                        </form>
                    </div>
                </div>
                <p>{{ $competency->statement }}</p>
            </div>

            <div class='col-12 my-3'>
                <p class="bold">Related resources:</p>
                <hr />
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <p class="fs-4 text-center">Courses</p>
                <div class="list-group">
                    @foreach ($competency->courses as $course)
                        <a href="/courses/{{ $course->id }}"
                            class="list-group-item list-group-item-action">{{ $course->code }}
                            - {{ $course->full_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <p class="fs-4 text-center">Attributes</p>
                <div class="list-group">
                    @foreach ($competency->related_attributes as $attribute)
                        <a href="/attributes/{{ $attribute->id }}"
                            class="list-group-item list-group-item-action">{{ $attribute->code }}
                            - {{ $attribute->short_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <p class="fs-4 text-center">Skills</p>
                <div class="list-group">
                    @foreach ($competency->skills as $skill)
                        <a href="/skills/{{ $skill->id }}"
                            class="list-group-item list-group-item-action">{{ $skill->code }}
                            - {{ $skill->short_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <p class="fs-4 text-center">Knowledge</p>
                <div class="list-group">
                    @foreach ($competency->knowledge as $knowledge)
                        <a href="/knowledge/{{ $knowledge->id }}"
                            class="list-group-item list-group-item-action">{{ $knowledge->code }}
                            - {{ $knowledge->short_name }}</a>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection
