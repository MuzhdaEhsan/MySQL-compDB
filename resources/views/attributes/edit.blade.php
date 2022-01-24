@extends('layouts.app')

@section('content')
    <form action="/attributes/{{ $attribute->id }}" method="POST" id='attributeEditForm'>
        @method('PUT')
        @csrf
        <div id="attributes-edit-view"></div>
    </form>
@endsection

@push('scripts')
    <script>
        // attributes original competencies
        let originalCode = '{{ $attribute->code }}';
        let originalShortName = '{{ $attribute->short_name }}';
        let originalStatement = '{{ $attribute->statement }}';
        let originalRelatedCompetencies = '{{ $attribute->competencies }}';
        
    </script>
@endpush
