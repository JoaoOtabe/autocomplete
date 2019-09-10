<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Ajax autocomplete</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<!-- Campo de input com o autocomplete deve receber a classe 'autocomplete-type' e o atributo title deve conter o nome da API, sem extensão -->
	<input type="text" name="exemplo" class="autocomplete-type" title="api" placeholder="Exemplo">
	<!-- Logo em sequência é obrigatório uma div com a classe autocomplete-box onde irão ser preenchidos os retornos do bd -->
	<div class="autocomplete-box"></div>

	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="autocomplete.js"></script>
</body>
</html>