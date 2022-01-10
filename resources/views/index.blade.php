@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="input-group my-3">
                    <div class="input-group-prepend">
                        <select class="form-select form-control" id="search-type">
                            <option value="competencies" selected>Competencies</option>
                            <option value="skills">Skills</option>
                            <option value="knowledge">Knowledge</option>
                            <option value="attributes">Attributes</option>
                            <option value="courses">Courses</option>
                        </select>
                    </div>
                    <input id='search-input' autoFocus type="text" class="form-control"
                        aria-label="Search input with dropdown list" placeholder="Search for code, name or statement" />
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div id="result-container" class="col-md-8"></div>
        </div>
    </div>
@endsection

@push('scripts')
    <script defer>
        // Start this block of code after the DOM has been loaded
        window.onload = () => {
            // Get HTML Elements.
            const inputElement = document.querySelector('#search-input');
            const selectElement = document.querySelector('#search-type');

            const search = async (keyword, type) => {
                const resultContainerElement = document.querySelector('#result-container');

                if (keyword.length > 0) {
                    const postgresData = await axios.get("/stateful-api/search", {
                        params: {
                            type,
                            keyword
                        },
                    });

                    if (postgresData.data.data.length > 0) {
                        let listGroupDiv = document.createElement('div');
                        listGroupDiv.classList.add('list-group');

                        postgresData.data.data.forEach(item => {
                            listGroupDiv.innerHTML +=
                                `<a href="/${type}/${item.id}" class="list-group-item list-group-item-action">${item.highlight}</a>`
                        });

                        resultContainerElement.innerHTML = "";
                        resultContainerElement.appendChild(listGroupDiv);
                    } else {
                        let errorDiv = document.createElement('div');
                        errorDiv.classList.add('alert', 'alert-warning');
                        errorDiv.innerHTML = `Sorry, we couldn't find any result for <b>${keyword}</b>`;
                        resultContainerElement.innerHTML = "";
                        resultContainerElement.appendChild(errorDiv);
                    }
                } else {
                    resultContainerElement.innerHTML = "";
                }
            };

            // Event listeners
            selectElement.addEventListener('change', function(e) {
                search(inputElement.value, e.target.value);
            });

            inputElement.addEventListener('input', function(e) {
                search(e.target.value, selectElement.value);
            });
        }
    </script>
@endpush
