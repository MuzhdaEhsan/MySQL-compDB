@extends('layouts.app')

@section('content')
    <form action="/users" method="POST" id='userCreateForm'>
        @csrf
        <input type="hidden" name="token" value="{{ csrf_token() }}"></input>
        <div id="users-create-view"></div>
    </form>
@endsection
