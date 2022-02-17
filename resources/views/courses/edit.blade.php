@extends('layouts.app')

@section('content')
    <form action="/courses/{{ $course->id }}" method="POST" id='courseEditForm'>
        @method('PUT')
        @csrf
        <div id="courses-edit-view"></div>
    </form>
@endsection

@push('scripts')
    <script>
        // courses original competencies
        let originalCode = '{{ $course->code }}';
        let originalFullName = '{{ $course->full_name }}';
        let originalRelatedCompetencies = '{{ $course->competencies }}';
        
    </script>
@endpush
