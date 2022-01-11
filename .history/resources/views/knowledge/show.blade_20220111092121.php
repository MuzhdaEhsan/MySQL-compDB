@extends('layouts.app')

@section('content')
<div class='row'>
        <div class='col-12'>
            <h1 class='text-center mb-5'>{{ $knowledge->code }} - {{ $knowledge->short_name }}</h1>
        </div>
        <div class='col-3 offset-3'>
            <h3 class="text-center">Competencies</h3>
            <div class="list-group">
                @foreach ($knowledge->competencies as $competency)
                    <a href="/competencies/{{ $competency->code }}"
                        class="list-group-item list-group-item-action">{{ $competency->code }}
                        - {{ $competency->short_name }}</a>
                @endforeach
            </div>
        </div>

        <div class='col-3'>
            <h3 class="text-center">Courses</h3>
            <div class="list-group">
                @foreach ($courses as $course)
                    <a href="/courses/" class="list-group-item list-group-item-action">
                        {{ $course->code }} - {{ $course->full_name }}
                    </a>
                @endforeach
            </div>
        </div>
    </div>
@endsection
