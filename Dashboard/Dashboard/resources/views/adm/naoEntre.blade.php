<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="/xiii" method="post">
        @csrf
        <label for="">nome</label>
        <input name="nome" type="text">
        <label for=""></label>
        <input name="nasci" type="text">
        <label for=""></label>
        <input name="rg" type="text">
        <label for="">email</label>
        <input name="email" type="text">
        <label for=""></label>
        <input name="tel" type="text">
        <label for="">senha</label>
        <input name="senha" type="text">
        <button>enviar</button>
    </form>
</body>

</html>