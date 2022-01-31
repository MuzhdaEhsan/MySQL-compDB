@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class="row justify-content-center">
            <div id="result-container" class="col-md-8">
                @if (count($knowledge) === 0)
                    <p class="fs-3">Knowledge trash is empty.</p>
                @else
                    @foreach ($knowledge as $aKnowledge)
                        <div class="row justify-content-center">
                            {{-- Knowledge details --}}
                            <div class="col-md-8">
                                <p class="fs-5 my-0">{{ $aKnowledge->code }} - {{ $aKnowledge->short_name }}</p>
                                <p class="fs-6 my-0">{{ $aKnowledge->statement }}</p>
                            </div>

                            {{-- Action buttons --}}
                            <div class="col-md-4">
                                {{-- Restore button --}}
                                <a href="/knowledge/{{ $aKnowledge->id }}/restore"
                                    onclick="event.preventDefault(); document.getElementById('restore-form-{{ $aKnowledge->id }}').submit();"
                                    class="btn btn-success btn-sm rounded-pill">
                                    <i class="fa fa-plus-circle"></i> Restore
                                </a>
                                <form id="restore-form-{{ $aKnowledge->id }}"
                                    action="/knowledge/{{ $aKnowledge->id }}/restore" method="POST"
                                    class="d-none">
                                    @csrf
                                </form>
                                {{-- Force delete button --}}
                                <a href="/knowledge/{{ $aKnowledge->id }}/force-delete"
                                    onclick="event.preventDefault(); document.getElementById('delete-form-{{ $aKnowledge->id }}').submit();"
                                    class="btn btn-danger btn-sm rounded-pill">
                                    <i class="fa fa-trash"></i> Force delete
                                </a>
                                <form id="delete-form-{{ $aKnowledge->id }}"
                                    action="/knowledge/{{ $aKnowledge->id }}/force-delete" method="POST"
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
