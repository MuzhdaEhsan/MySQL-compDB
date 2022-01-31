@extends('layouts.app')

@section('content')
    <form action="/knowledge/{{ $knowledge->id }}" method="POST" id='knowledgeEditForm'>
        @method('PUT')
        @csrf
        <div id="knowledge-edit-view"></div>
    </form>
@endsection

@push('scripts')
    <script>
        // knowledge original competencies
        let originalCode = '{{ $knowledge->code }}';
        let originalShortName = '{{ $knowledge->short_name }}';
        let originalStatement = '{{ $knowledge->statement }}';
        let originalRelatedCompetencies = '{{ $knowledge->competencies }}';
        
    </script>
@endpush
