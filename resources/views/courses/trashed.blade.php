@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="row justify-content-center">
            <div id="result-container" class="col-md-8">
                @if (count($courses) === 0)
                    <p class="fs-3">Course trash is empty.</p>
                @else
                    @foreach ($courses as $course)
                        <div class="row justify-content-center">
                            {{-- course details --}}
                            <div class="col-md-8">
                                <p class="fs-5 my-0">{{ $course->code }} - {{ $course->full_name }}</p>
                            </div>

                            {{-- Action buttons --}}
                            <div class="col-md-4">
                                {{-- Restore button --}}
                                <a href="/courses/{{ $course->id }}/restore"
                                    onclick="event.preventDefault(); document.getElementById('restore-form-{{ $course->id }}').submit();"
                                    class="btn btn-success btn-sm rounded-pill">
                                    <i class="fa fa-plus-circle"></i> Restore
                                </a>
                                <form id="restore-form-{{ $course->id }}"
                                    action="/courses/{{ $course->id }}/restore" method="POST"
                                    class="d-none">
                                    @csrf
                                </form>
                                {{-- Force delete button --}}
                                <a href="/courses/{{ $course->id }}/force-delete"
                                    onclick="event.preventDefault(); document.getElementById('delete-form-{{ $course->id }}').submit();"
                                    class="btn btn-danger btn-sm rounded-pill">
                                    <i class="fa fa-trash"></i> Force delete
                                </a>
                                <form id="delete-form-{{ $course->id }}"
                                    action="/courses/{{ $course->id }}/force-delete" method="POST"
                                    class="d-none">
                                    @csrf
                                    @method('DELETE')
                                </form>
                            </div>
                        </div>
                        <hr />
                    @endforeach
                @endif
            </div>
        </div>
    </div>
@endsection
