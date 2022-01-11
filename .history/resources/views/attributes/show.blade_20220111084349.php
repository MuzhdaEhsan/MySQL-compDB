@extends('layouts.app')

@section('content')
    <div class="container py-2">
        <div class="row justify-content-center">
            <div class='col-12'>
                <h1 class='text-center mb-5'>{{ $attribute->code }} - {{ $attribute->short_name }}</h1>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <h3 class="text-center">Courses</h3>
                <div class="list-group">
                    @foreach ($competency->courses as $course)
                        <a href="/courses/{{ $course->id }}"
                            class="list-group-item list-group-item-action">{{ $course->code }}
                            - {{ $course->full_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <h3 class="text-center">Attributes</h3>
                <div class="list-group">
                    @foreach ($competency->related_attributes as $attribute)
                        <a href="/attributes/{{ $attribute->id }}"
                            class="list-group-item list-group-item-action">{{ $attribute->code }}
                            - {{ $attribute->short_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <h3 class="text-center">Skills</h3>
                <div class="list-group">
                    @foreach ($competency->skills as $skill)
                        <a href="/skills/{{ $skill->id }}"
                            class="list-group-item list-group-item-action">{{ $skill->code }}
                            - {{ $skill->short_name }}</a>
                    @endforeach
                </div>
            </div>

            <div class='col-12 col-md-6 col-lg-3'>
                <h3 class="text-center">Knowledge</h3>
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
