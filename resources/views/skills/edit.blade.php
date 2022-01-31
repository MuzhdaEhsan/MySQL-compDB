@extends('layouts.app')

@section('content')
    <form action="/skills/{{ $skill->id }}" method="POST" id='skillEditForm'>
        @method('PUT')
        @csrf
        <div id="skills-edit-view"></div>
    </form>
@endsection

@push('scripts')
    <script>
        // skills original competencies
        let originalCode = '{{ $skill->code }}';
        let originalShortName = '{{ $skill->short_name }}';
        let originalStatement = '{{ $skill->statement }}';
        let originalRelatedCompetencies = '{{ $skill->competencies }}';
        
    </script>
@endpush
