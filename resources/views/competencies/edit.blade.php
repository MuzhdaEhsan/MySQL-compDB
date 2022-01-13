@extends('layouts.app')

@section('content')
    <form action="/competencies/{{ $competency->id }}" method="POST" id='competencyEditForm'>
        @method('PUT')
        @csrf
        <div id="competencies-edit-view"></div>
    </form>
@endsection

@push('scripts')
    <script>
        // Competency original attributes
        let originalCode = '{{ $competency->code }}';
        let originalShortName = '{{ $competency->short_name }}';
        let originalStatement = '{{ $competency->statement }}';
        let originalRelatedSkills = '{{ $competency->skills }}';
    </script>
@endpush
