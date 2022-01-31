@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="row justify-content-center">
            <div id="result-container" class="col-md-8">
                @if (count($skills) === 0)
                    <p class="fs-3">Skill trash is empty.</p>
                @else
                    @foreach ($skills as $skill)
                        <div class="row justify-content-center">
                            {{-- skill details --}}
                            <div class="col-md-8">
                                <p class="fs-5 my-0">{{ $skill->code }} - {{ $skill->short_name }}</p>
                                <p class="fs-6 my-0">{{ $skill->statement }}</p>
                            </div>

                            {{-- Action buttons --}}
                            <div class="col-md-4">
                                {{-- Restore button --}}
                                <a href="/skills/{{ $skill->id }}/restore"
                                    onclick="event.preventDefault(); document.getElementById('restore-form-{{ $skill->id }}').submit();"
                                    class="btn btn-success btn-sm rounded-pill">
                                    <i class="fa fa-plus-circle"></i> Restore
                                </a>
                                <form id="restore-form-{{ $skill->id }}"
                                    action="/skills/{{ $skill->id }}/restore" method="POST"
                                    class="d-none">
                                    @csrf
                                </form>
                                {{-- Force delete button --}}
                                <a href="/skills/{{ $skill->id }}/force-delete"
                                    onclick="event.preventDefault(); document.getElementById('delete-form-{{ $skill->id }}').submit();"
                                    class="btn btn-danger btn-sm rounded-pill">
                                    <i class="fa fa-trash"></i> Force delete
                                </a>
                                <form id="delete-form-{{ $skill->id }}"
                                    action="/skills/{{ $skill->id }}/force-delete" method="POST"
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
