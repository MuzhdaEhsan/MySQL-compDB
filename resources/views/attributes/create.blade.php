@extends('layouts.app')

@section('content')
    <form action="/attributes" method="POST" id='attributeCreateForm'>
        @csrf
        <div id="attributes-create-view"></div>
    </form>
@endsection
