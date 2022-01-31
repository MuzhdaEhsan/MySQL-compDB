@extends('layouts.app')

@section('content')
<div class="container py-2">
        {{-- Results per page selector --}}
        <div class="row justify-content-center">
            <div class="col-md-8 d-flex justify-content-end align-items-center">
                <p class="mb-0 me-1">Results per page: </p>
                <select id="per-page-select">
                    <option value="10" {{ request()->query('resultsPerPage') == 10 ? 'selected' : '' }}>10</option>
                    <option value="25" {{ request()->query('resultsPerPage') == 25 ? 'selected' : '' }}>25</option>
                    <option value="50" {{ request()->query('resultsPerPage') == 50 ? 'selected' : '' }}>50</option>
                    <option value="100" {{ request()->query('resultsPerPage') == 100 ? 'selected' : '' }}>100</option>
                </select>
            </div>
        </div>

        {{-- Sorting selector --}}
        <div class="row justify-content-center mt-1">
            <div class="col-md-8 d-flex justify-content-end align-items-center">
                <p class="mb-0 me-1">Sort by: </p>
                <select id="sort-select">
                    <option value="default">Default</option>
                    <option value="action.asc"
                        {{ request()->query('orderBy') === 'action' && request()->query('orderByType') === 'asc' ? 'selected' : '' }}>
                        Action (ASC)</option>
                    <option value="action.desc"
                        {{ request()->query('orderBy') === 'action' && request()->query('orderByType') === 'desc' ? 'selected' : '' }}>
                        Action (DESC)</option>
                    <option value="table_name.asc"
                        {{ request()->query('orderBy') === 'table_name' && request()->query('orderByType') === 'asc' ? 'selected' : '' }}>
                        Table Name (ASC)</option>
                    <option value="table_name.desc"
                        {{ request()->query('orderBy') === 'table_name' && request()->query('orderByType') === 'desc' ? 'selected' : '' }}>
                        Table Name (DESC)</option>
                </select>
            </div>
        </div>

        {{-- Main table --}}
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-striped caption-top">
                        {{-- Table caption --}}
                        <caption>List of Logs</caption>

                        {{-- Table header --}}
                        <thead>
                            <tr>
                                <th scope="col" width="10%">User ID</th>
                                <th scope="col" width="15%">Action</th>
                                <th scope="col" width="30%">Table Name</th>
                                <th scope="col" width="10%">Record ID</th>
                                <th scope="col" width="25%">Actions</th>
                            </tr>
                        </thead>

                        {{-- Table body --}}
                        <tbody>
                            @foreach ($logs as $log)
                                <tr>
                                    <td>{{ $log->user_id }}</td>
                                    <td>{{ $log->action }}</td>
                                    <td>{{ $log->table_name }}</td>
                                    <td>{{ $log->record_id }}</td>
                                    <td>
                                        <ul class="list-inline m-0">
                                            <li class="list-inline-item">
                                                <a href="/logs/{{ $log->id }}"
                                                    class="btn btn-primary btn-sm rounded-pill">
                                                    <i class="fa fa-eye"></i> View
                                                </a>
                                            </li>
                                            
                                            
                                        </ul>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                {{-- Automatically generated paginator by Laravel --}}
                {{ $logs->onEachSide(1)->links() }}
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script defer>
        window.onload = () => {
            // HTML elements
            const perPageSelect = document.querySelector('#per-page-select');
            const sortSelect = document.querySelector('#sort-select');

            const getPerPageQuery = () => {
                return `resultsPerPage=${perPageSelect.value}`
            };

            const getSortQuery = () => {
                if (sortSelect.value === 'default') {
                    return '';
                }
                const query = sortSelect.value.split('.');
                return `orderBy=${query[0]}&orderByType=${query[1]}`;
            };

            // Event listener 
            perPageSelect.addEventListener('change', () => {
                window.location.href = `${window.location.pathname}?${getPerPageQuery()}&${getSortQuery()}`;
            });
            sortSelect.addEventListener('change', () => {
                window.location.href = `${window.location.pathname}?${getPerPageQuery()}&${getSortQuery()}`;
            });
        }
    </script>
@endpush
