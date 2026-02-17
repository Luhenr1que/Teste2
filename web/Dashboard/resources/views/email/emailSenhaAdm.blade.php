<!DOCTYPE html>
<html>
<head>
    <title>Email do Laravel</title>
</head>
<body>
    <h1>Olá!</h1>
    <ul>
        @foreach($code as $c)
            <li>{{ $c }}</li>
        @endforeach
    </ul>
</body>
</html>
