<div class="row justify-content-center">
    <div class="col-md-6 bg-danger bg-success bg-opacity-25 rounded">
        @if ($errors->any())
            {!! implode('', $errors->all('<div class="p-2 text-dark">:message</div>')) !!}
        @endif
    </div>
</div>
