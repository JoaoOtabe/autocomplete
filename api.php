<?php
	/* TODO O CONTEÚDO DE BANCO DE DADOS ESTÁ COMENTADO PARA FUNCIONAMENTO DE EXEMPLO
	// Conectando a um banco de exemplo
	$dsn = 'mysql:dbname=teste;host=127.0.0.1';
	$bd = new PDO($dsn, 'root', '');

	$busca = ''; // Estabelecendo uma variável para busca, que vem via GET
	if(isset($_GET['val']) && $_GET['val'] != '') {
		$busca = $_GET['val'];
	}
	// Realizando a busca no banco especificado
	$query = $bd->query("select distinct pratos from autocomplete where pratos like '%".$busca."%' order by setor limit 0,6");
	$res = $query->fetchAll(PDO::FETCH_ASSOC);
	$jsonRes = array();
	foreach($res as $prato) {
		$jsonRes[] = $prato['pratos'];
	}
	// Imprimindo os resultados codificados em Json
	header('Content-Type: application/json');
	echo json_encode($jsonRes);
	*/

	$busca = '';
	if(isset($_GET['val']) && $_GET['val'] != '') {
		$busca = $_GET['val'];
	}
	$base = ['Hambúrguer', 'Salada', 'Sushi', 'Churrasco', 'Salgado', 'Sobremesa', 'Macarrão', 'Assado'];
	
	$jsonRes = array();

	for($i = 0; $i < count($base); $i++) {
		if(preg_match('/'.$busca.'/', $base[$i]) == 1) {
			$jsonRes[] = $base[$i]
		}
	}

	header('Content-Type: application/json');
	echo json_encode($jsonRes);