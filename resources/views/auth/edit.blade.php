@extends('layouts.app')

@section('content')
    <form action="/users/{{ $user->id }}" method="POST" id='userEditForm'>
        @method('PUT')
        @csrf
        <div id="users-edit-view"></div>
    </form>
@endsection

@push('scripts')
    <script>
        // users original data
        let originalName = '{{ $user->name }}';
        let originalEmail = '{{ $user->email }}';
        let originalPassword = '{{ $user->password }}';
        let originalIsAdmin = '{{ $user->is_admin }}';
        
    </script>
@endpush
