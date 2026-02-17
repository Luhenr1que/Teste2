@foreach ($countryData as $item)
<h1>
    {{ $item['country'] }} : {{ $item['popularity'] }}
</h1>
@endforeach