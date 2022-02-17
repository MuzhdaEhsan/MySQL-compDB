@extends('layouts.app')

@section('content')
    <form action="/courses" method="POST" id='courseCreateForm'>
        @csrf
        <div id="courses-create-view"></div>
    </form>
@endsection
