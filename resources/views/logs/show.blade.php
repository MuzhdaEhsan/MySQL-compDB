@extends('layouts.app')

@section('content')
    <div class="container py-4">
        <div class='row justify-content-center'>
            <div class='col-12 my-6'>
                <div class="list-group pt-4">
                    <p class="bold">User ID:  {{ $log->user_id }}</p>
                    <p class="bold">Action:  {{ $log->action }}</p>
                    <p class="bold">Table Name:  {{ $log->table_name }}</p>
                    <p class="bold">Record ID:  {{ $log->record_id }}</p>
                    <p class="bold">New State:  {{ $log->new_state }}</p>
                    <p class="bold">Old State:  {{ $log->old_state }}</p>
                </div>

                
            </div>
        </div>
    </div>
@endsection
