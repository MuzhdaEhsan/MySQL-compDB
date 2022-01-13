@extends('layouts.app')

@section('content')
    <div class="container py-2">
        {{-- Results per page selector --}}
        <div class="row justify-content-center">
            <div class="col-md-8 d-flex justify-content-end align-items-center">
                @foreach ($logs as $log)
                    <p>User ID #{{ $log->user_id }} {{ $log->action }} record ID #{{ $log->record_id }}
                        {{ $log->table_name }} </p>
                @endforeach
            </div>
        </div>
    </div>
@endsection
