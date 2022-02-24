@extends('layouts.app')

@section('content')
    <form action="/users/ {{ $id }}/UpdatePass" method="POST" id='userChangePassForm'>
        @csrf
        <div id="users-changePass-view"></div>
    </form>
@endsection
