'use strict';

var editimage = editimage = editimage || function(){

	var instancias = {};


	var inicializar = function(idDivContainer){

			var painelControle = editimage.fabricaPainelControle.criar();

			var div = document.getElementById(idDivContainer);

			var canvas = criarElementoHtmlCanvas();

			var divPainelControle = criarElementoHtmlPainelControle(painelControle);

			instancias[idDivContainer] = criarInstancia(canvas);

			div.appendChild(divPainelControle);
			div.appendChild(canvas);

		};

	var criarElementoHtmlCanvas = function(){

		var divCanvas = document.createElement('div');
		divCanvas.setAttribute('class', 'container')

		var canvas = document.createElement('canvas');

		divCanvas.appendChild(canvas);

		return divCanvas;

	};

	var criarElementoHtmlPainelControle = function(pPainelControle){

		var painelControle = pPainelControle;

		var divPainelControle =  document.createElement('div');
		
		divPainelControle.setAttribute('class', 'painel-controle');

		var botaoSelecionarImagem = criarBotaoSelecionarImagem(painelControle.selecionarImagem);

		divPainelControle.appendChild(botaoSelecionarImagem);

		var botaoRetangulo = criarBotaoRetangulo(painelControle.criarRetangulo);

		divPainelControle.appendChild(botaoRetangulo);

		var botaoElipse = criarBotaoElipse(painelControle.criarElipse);

		divPainelControle.appendChild(botaoElipse);

		var botaoLinha = criarBotaoLinha(painelControle.criarLinha);

		divPainelControle.appendChild(botaoLinha);

		return divPainelControle;

	};

	var criarBotaoSelecionarImagem = function(pEvento){

		var evento = pEvento;

		if(!evento || typeof evento !== 'function') throw new Error("Informe o evento do botão selecionar imagem.");

		var labelSelecionarImagem = document.createElement('label');
		labelSelecionarImagem.setAttribute('class','botao');

		var icone = criarIconeBotao('selecionar-imagem');

		labelSelecionarImagem.appendChild(icone);

		var botaoSelecionarImagem = document.createElement('input');

		botaoSelecionarImagem.setAttribute('type', 'file');
		botaoSelecionarImagem.setAttribute('class', 'botao-selecionar-imagem');

		botaoSelecionarImagem.onchange = function(){

			evento(this.files[0]);

		};
	

		labelSelecionarImagem.appendChild(botaoSelecionarImagem);
		

		return labelSelecionarImagem;

	};

	var criarBotaoRetangulo = function(pEvento){
		
		var evento = pEvento;

		if(!evento || typeof evento !== 'function') throw new Error("Informe o evento do botão criar retângulo.");

		var botaoRetangulo = document.createElement('button');

		botaoRetangulo.setAttribute('type', 'button');
		botaoRetangulo.setAttribute('class', 'botao botao-retangulo');

		botaoRetangulo.onclick = function(){

			evento();

		};

		var icone = criarIconeBotao('retangulo');

		botaoRetangulo.appendChild(icone);

		return botaoRetangulo;

	};

	var criarBotaoElipse = function(pEvento){

		var evento = pEvento;

		if(!evento || typeof evento !== 'function') throw new Error("Informe o evento do botão criar elipse.");

		var botaoElipse = document.createElement('button');

		botaoElipse.setAttribute('type', 'button');
		botaoElipse.setAttribute('class', 'botao botao-elipse');

		botaoElipse.onclick = function(){

			evento();

		};

		var icone = criarIconeBotao('elipse');

		botaoElipse.appendChild(icone);

		return botaoElipse;

	};

	var criarBotaoLinha = function(pEvento){

		var evento = pEvento;

		if(!evento || typeof evento !== 'function') throw new Error("Informe o evento do botão criar linha.");

		var botaoLinha = document.createElement('button');

		botaoLinha.setAttribute('type', 'button');
		botaoLinha.setAttribute('class', 'botao botao-linha');
		
		botaoLinha.onclick = function(){

			evento();

		};

		var icone = criarIconeBotao('linha');
		botaoLinha.appendChild(icone);

		return botaoLinha;

	};

	var criarIconeBotao = function(nomeIcone){

		var spanIcone = document.createElement('span');
		spanIcone.setAttribute('class', 'icon icon-'+ nomeIcone);

		return spanIcone;

	}

	var criarInstancia = function(canvas){

		return {
			contexto: editimage.fabricaContexto.criar()
		};

	};

	return {

		inicializar: inicializar,
		retornarInstancia: function(id){

			return instancias[id];

		}

	}

}();

	editimage.fabricaContexto = { 
		
		criar: function(){

			return {};
		}

	};

	editimage.fabricaPainelControle = { 
		
		criar: function(){

			return {

				selecionarImagem: function(arquivoImagem){


				},
				criarRetangulo: function(){


				},
				criarElipse: function(){


				},
				criarLinha: function(){


				}

			}

		}

	};