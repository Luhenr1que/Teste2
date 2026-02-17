@if ($paginator->hasPages())
<nav class="paginacao-container">

    <div class="paginacao-info">
        Mostrando {{ $paginator->firstItem() }} a {{ $paginator->lastItem() }} de {{ $paginator->total() }} resultados
    </div>

    <ul class="pagination">

        {{-- Página anterior --}}
        @if ($paginator->onFirstPage())
            <li class="page-item disabled"><span class="page-link">‹</span></li>
        @else
            <li class="page-item"><a class="page-link" href="{{ $paginator->previousPageUrl() }}">‹</a></li>
        @endif

        {{-- Páginas --}}
        @php
            $totalPages = $paginator->lastPage();
            $current = $paginator->currentPage();
            $interval = 2;
        @endphp

        {{-- Primeira página --}}
        @if ($current > $interval + 2)
            <li class="page-item"><a class="page-link" href="{{ $paginator->url(1) }}">1</a></li>
            <li class="page-item"><span class="page-link ellipsis-btn">…</span></li>
        @endif

        {{-- Loop do bloco de páginas --}}
        @for ($i = max(1, $current - $interval); $i <= min($totalPages, $current + $interval); $i++)
            @if ($i == $current)
                <li class="page-item active"><span class="page-link">{{ $i }}</span></li>
            @else
                <li class="page-item"><a class="page-link" href="{{ $paginator->url($i) }}">{{ $i }}</a></li>
            @endif
        @endfor

        {{-- Última página --}}
        @if ($current < $totalPages - ($interval + 1))
            <li class="page-item"><span class="page-link ellipsis-btn">…</span></li>
            <li class="page-item"><a class="page-link" href="{{ $paginator->url($totalPages) }}">{{ $totalPages }}</a></li>
        @endif

        {{-- Próxima página --}}
        @if ($paginator->hasMorePages())
            <li class="page-item"><a class="page-link" href="{{ $paginator->nextPageUrl() }}">›</a></li>
        @else
            <li class="page-item disabled"><span class="page-link">›</span></li>
        @endif

    </ul>

</nav>
@endif
