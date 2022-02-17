@extends('layouts.app')

@section('content')
    <form action="/users/ {{ auth()->user()->id }}/UpdatePass" method="POST" id='userChangePassForm'>
        @csrf
        <div id="users-changePass-view"></div>
        <div>{{ auth()->user()->id }}</div>
    </form>
@endsection
