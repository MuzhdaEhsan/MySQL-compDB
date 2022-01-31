@extends('layouts.app')

@section('content')
    <form action="/knowledge" method="POST" id='knowledgeCreateForm'>
        @csrf
        <div id="knowledge-create-view"></div>
    </form>
@endsection
