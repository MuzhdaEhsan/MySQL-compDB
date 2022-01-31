@extends('layouts.app')

@section('content')
    <div class="container py-2">
        {{-- Results per page selector --}}
        <div class="row justify-content-center">
            <div class="col-5 d-flex align-items-center">
                <div>
                    <a href="/knowledge/create" class="btn btn-primary btn-sm rounded-pill">
                        <i class="fa fa-plus"></i> Create
                    </a>
                </div>
                @if (auth()->user()->isAdmin())
                    <div class="ms-3">
                        <a href="/knowledge/trashed" class="btn btn-dark btn-sm rounded-pill">
                            <i class="fa fa-trash"></i> Trashed Knowledge
                            ({{ count($trashedKnowledge) === 0 ? 'Empty' : (count($trashedKnowledge) === 1 ? count($trashedKnowledge) . ' item' : count($trashedKnowledge) . ' items') }})
                        </a>
                    </div>
                @endif
            </div>
            <div class="col-3">
                <div class="d-flex justify-content-end align-items-center mb-2">
                    <p class="mb-0 me-1">Results per page: </p>
                    <select id="per-page-select">
                        <option value="10" {{ request()->query('resultsPerPage') == 10 ? 'selected' : '' }}>10</option>
                        <option value="25" {{ request()->query('resultsPerPage') == 25 ? 'selected' : '' }}>25</option>
                        <option value="50" {{ request()->query('resultsPerPage') == 50 ? 'selected' : '' }}>50</option>
                        <option value="100" {{ request()->query('resultsPerPage') == 100 ? 'selected' : '' }}>100</option>
                    </select>
                </div>

                <div class="d-flex justify-content-end align-items-center">
                    <p class="mb-0 me-1">Sort by: </p>
                    <select id="sort-select">
                        <option value="default">Default</option>
                        <option value="short_name.asc"
                            {{ request()->query('orderBy') === 'short_name' && request()->query('orderByType') === 'asc' ? 'selected' : '' }}>
                            Short name (ASC)</option>
                        <option value="short_name.desc"
                            {{ request()->query('orderBy') === 'short_name' && request()->query('orderByType') === 'desc' ? 'selected' : '' }}>
                            Short name (DESC)</option>
                        <option value="statement.asc"
                            {{ request()->query('orderBy') === 'statement' && request()->query('orderByType') === 'asc' ? 'selected' : '' }}>
                            Statement (ASC)</option>
                        <option value="statement.desc"
                            {{ request()->query('orderBy') === 'statement' && request()->query('orderByType') === 'desc' ? 'selected' : '' }}>
                            Statement (DESC)</option>
                    </select>
                </div>
            </div>
        </div>

        {{-- Main table --}}
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-striped caption-top">
                        {{-- Table caption --}}
                        <caption>List of knowledge</caption>

                        {{-- Table header --}}
                        <thead>
                            <tr>
                                <th scope="col" width="10%">Code</th>
                                <th scope="col" width="25%">Short Name</th>
                                <th scope="col" width="35%">Statement</th>
                                <th scope="col" width="30%">Actions</th>
                            </tr>
                        </thead>

                        {{-- Table body --}}
                        <tbody>
                            @foreach ($knowledge as $aKnowledge)
                                <tr>
                                    <td>{{ $aKnowledge->code }}</td>
                                    <td>{{ $aKnowledge->short_name }}</td>
                                    <td>{{ $aKnowledge->statement }}</td>
                                    <td>
                                        <ul class="list-inline m-0">
                                            <li class="list-inline-item">
                                                <a href="/knowledge/{{ $aKnowledge->id }}"
                                                    class="btn btn-primary btn-sm rounded-pill">
                                                    <i class="fa fa-eye"></i> View
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="/knowledge/{{ $aKnowledge->id }}/edit"
                                                    class="btn btn-success btn-sm rounded-pill">
                                                    <i class="fa fa-edit"></i> Edit
                                                </a>
                                            </li>
                                            <li class="list-inline-item">
                                                <a href="/knowledge/{{ $aKnowledge->id }}"
                                                    onclick="event.preventDefault(); document.getElementById('delete-form-{{ $aKnowledge->id }}').submit();"
                                                    class="btn btn-danger btn-sm rounded-pill">
                                                    <i class="fa fa-trash"></i> Delete
                                                </a>
                                                <form id="delete-form-{{ $aKnowledge->id }}"
                                                    action="/knowledge/{{ $aKnowledge->id }}" method="POST"
                                                    class="d-none">
                                                    @csrf
                                                    @method('DELETE')
                                                </form>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                {{-- Automatically generated paginator by Laravel --}}
                {{ $knowledge->onEachSide(1)->links() }}
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
