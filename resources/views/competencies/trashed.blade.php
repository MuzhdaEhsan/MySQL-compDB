@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="row justify-content-center">
            <div id="result-container" class="col-md-8">
                @if (count($competencies) === 0)
                    <p class="fs-3">Competency trash is empty.</p>
                @else
                    @foreach ($competencies as $competency)
                        <div class="row justify-content-center">
                            {{-- Competency details --}}
                            <div class="col-md-8">
                                <p class="fs-5 my-0">{{ $competency->code }} - {{ $competency->short_name }}</p>
                                <p class="fs-6 my-0">{{ $competency->statement }}</p>
                            </div>

                            {{-- Action buttons --}}
                            <div class="col-md-4">
                                {{-- Restore button --}}
                                <a href="/competencies/{{ $competency->id }}/restore"
                                    onclick="event.preventDefault(); document.getElementById('restore-form-{{ $competency->id }}').submit();"
                                    class="btn btn-success btn-sm rounded-pill">
                                    <i class="fa fa-plus-circle"></i> Restore
                                </a>
                                <form id="restore-form-{{ $competency->id }}"
                                    action="/competencies/{{ $competency->id }}/restore" method="POST"
                                    class="d-none">
                                    @csrf
                                </form>
                                {{-- Force delete button --}}
                                <a href="/competencies/{{ $competency->id }}/force-delete"
                                    onclick="event.preventDefault(); document.getElementById('delete-form-{{ $competency->id }}').submit();"
                                    class="btn btn-danger btn-sm rounded-pill">
                                    <i class="fa fa-trash"></i> Force delete
                                </a>
                                <form id="delete-form-{{ $competency->id }}"
                                    action="/competencies/{{ $competency->id }}/force-delete" method="POST"
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
