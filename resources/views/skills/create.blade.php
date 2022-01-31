@extends('layouts.app')

@section('content')
    <form action="/skills" method="POST" id='skillCreateForm'>
        @csrf
        <div id="skills-create-view"></div>
    </form>
@endsection
