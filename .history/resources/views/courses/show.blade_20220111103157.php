@extends('layouts.app')

@section('content')
<div class='row'>
    <div class='col-12'>
        <h1 class='text-center mb-5'>{{ $course->code }} - {{ $course->full_name }}</h1>
    </div>

    <div class='col-4 offset-4'>
        <h3 class="text-center">Competencies</h3>
        <div class="list-group">
            @foreach ($course->competencies as $competency)
                <a href="/competencies/{{ $competency->code }}"
                    class="list-group-item list-group-item-action">{{ $competency->code }}
                    - {{ $competency->short_name }}</a>
            @endforeach
        </div>
    </div>  
</div>
@endsection
