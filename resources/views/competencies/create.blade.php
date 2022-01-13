@extends('layouts.app')

@section('content')
    <form action="/competencies" method="POST" id='competencyCreateForm'>
        @csrf
        <div id="competencies-create-view"></div>
    </form>
@endsection
