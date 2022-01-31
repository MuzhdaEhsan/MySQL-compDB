@extends('layouts.app')

@section('content')
    <form action="/users" method="POST" id='userCreateForm'>
        @csrf
        <div id="users-create-view"></div>
    </form>
@endsection
