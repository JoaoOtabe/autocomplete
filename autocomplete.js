/* 
 * Autocomplete em campo digitável com busca em banco de dados
 * Funciona ao se digitar no campo de classe autocomplete-type
 */
$(document).ready(function(){
	// Previnindo de enviar o formulário ao clicar no enter (dentro de campo autocomplete)
	$('.autocomplete-type').keydown(function(event){
		if(event.which == 13) {
			event.preventDefault();
		}
	});
	// Variável para o placeholder original
	var pHolder = '';
	// Pegando o valor do placeholder padrão
	$('.autocomplete-type').focusin(function(){
		pHolder = $(this).attr('placeholder');
	});
	// Deixando o autocomplete padrão, caso nenhum valor tenha sido preenchido
	$('.autocomplete-type').focusout(function() {
		$(this).attr('placeholder', pHolder);
	});
	// Iniciando a digitação o eventos de teclado no campo de autocomplete
	$('.autocomplete-type').keyup(function(event){
		$(this).next().show(); // Torna visível a div que abriga os resultados
		// Click na seta para cima
		if(event.which == 38) {
			var lastSelected = $('.sel'); // Selecionando o campo ativo, pela classe sel, para o tornar como último ativo
			lastSelected.prev().toggleClass('sel'); // Vai atribuir a um elemento p acima a classe sel, para este passar a ser o elemento ativo
			lastSelected.toggleClass('sel'); // Vai remover a classe sel do último ativo
			$(this).val(''); // Esvazia o campo de digitação para na sequência preencher com o placeholder do campo sendo navegado
			$(this).attr('placeholder', $('.sel').text()); // Atribui um placeholder para indicar um campo em seleção
		}
		// Click na seta para baixo
		else if(event.which == 40) {
			// Verificando se existem resultados retornados dentro da div que abriga os resultados
			if($(this).next().find('p').length == 0) {
				aData($(this).attr('title'), $(this).next(), $(this).val()); // Caso não tenha resultados, vai chamar a função de busca do ajax, para trazer todos resultados
			}
			// Caso nenhum resultado tenha sido selecionado pela navegação com setas
			if($('.sel').length == 0) {
				$(this).next().find('p:first-child').toggleClass('sel'); // Vai atribuir a classe sel para o primeiro da lista (pela lógica de ir pra baixo)
				$(this).val(''); // Esvazia o campo de digitação para na sequência preencher com o placeholder do campo sendo navegado
				$(this).attr('placeholder', $('.sel').text()); // Atribui um placeholder para indicar um campo em seleção
			}
			// Caso já exista campo selecionado, navegar em sequência
			else {
				var lastSelected = $('.sel'); // Selecionando o campo ativo, pela classe sel, para o tornar como último ativo
				// Verificando se existem mais resultados após o atual selecionado
				if(lastSelected.next().text() != '') {
					lastSelected.next().toggleClass('sel'); // Vai atribuir a um elemento p abaixo a classe sel, para este passar a ser o elemento ativo
					lastSelected.toggleClass('sel'); // Vai remover a classe sel do último ativo
					$(this).val(''); // Esvazia o campo de digitação para na sequência preencher com o placeholder do campo sendo navegado
					$(this).attr('placeholder', $('.sel').text()); // Atribui um placeholder para indicar um campo em seleção
				}
			}			
		}
		// Click no enter - selecionando o resultado
		else if(event.which == 13) {
			$(this).val($('.sel').text()); // Passando o valor do resultado selecionado para dentro do campo de autocomplete
			$('.sel').toggleClass('sel'); // Removendo a classe de sel
			$('.autocomplete-box').empty(); // Esvaziando a div dos resultados
			$(this).next().hide(); // Escondendo a div dos resultados
			event.preventDefault(); // Evitando o formulário de ser enviado com o enter
		}
		// Caso o primeiro clique seja qualquer digitação chamar a função de busca assíncrona
		else {
			aData($(this).attr('title'), $(this).next(), $(this).val());
		}
	});
	// Verificando um click do mouse fora do campo em digitação
	$(document).mouseup(function (event){
		var autocompleteActive = $('.autocomplete-type');
		if (!autocompleteActive.is(event.target) && !autocompleteActive.next().is(event.target) && !autocompleteActive.is(':focus')){
			autocompleteActive.next().hide();
		}
	});
	// Quando qualquer campo for selecionado, as divs com os resultados são ocultadas e esvaziadas
	$('form').find('input, select, radio, checkbox, textarea').focusin(function() {
		$('.autocomplete-box').empty();
	 	$('.autocomplete-box').hide();
	});
	// Função para o retorno Ajax.
	// Recebe api->nome do arquivo que retorna json do banco(sem extensão)
	// sugestion->div que engloba os resultados
	// getVal->valor para ser passado  via get para a consulta no banco
	function aData(api, sugestion, getVal = null){
		$.ajax({
			type: 'GET', // Tipo da requisição
			url: api+'.php?val='+getVal, // A api
			success: function(data) { // Sucesso retorna data. No nosso caso o json da api, um vetor
				$('.autocomplete-box').empty(); // Esvazia a div de resultados
				// Insere cada um dos resultados dentro do container
				$.each(data, function(i, setor) {
					sugestion.append('<p class="autocomplete-option">'+setor+'</p>'); // Os campos sao preenchidos com a classe autocomplete-option
				});
				// Selecionando o resultado com click do mouse
				$('.autocomplete-option').click(function() {
					$(this).parent().prev().val($(this).text()); // Passando o valor do campo clicado para o campo de autocomplete
					$('.autocomplete-box').empty(); // Esvaziando a div com os resultados
					$('.autocomplete-box').hide(); // Escondendo a div com os resultados
				});
			}
		});
	}
});