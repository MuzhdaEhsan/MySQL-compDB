<div class="row justify-content-center">
    <div class="col-md-8">
        @if (session('status'))
            <div class="alert alert-{{ session('type') ?? 'success' }}" role="alert">
                {{ session('status') }}
            </div>
        @endif
    </div>
</div>
