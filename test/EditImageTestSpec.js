'use strict';

describe('Inicialização - ', function(){

	var stage,
	 eventoSelecionarImagem,
	 criarFabricaImagem,
	 eventoCriarRetangulo,
	 eventoCriarElipse,
	 eventoCriarLinha;
    

	editimage.fabricaContexto = { 
		
		criar: function(){
			stage = {};

			return {};
		}

	};

	editimage.fabricaPainelControle = { 
		
		criar: function(){

			return {

				selecionarImagem: function(arquivoImagem){

					eventoSelecionarImagem = {};
					editimage.fabricaImagem.criar(arquivoImagem);

				},
				criarRetangulo: function(){

					eventoCriarRetangulo = {};

				},
				criarElipse: function(){

					eventoCriarElipse = {};

				},
				criarLinha: function(){

					eventoCriarLinha = {};

				}

			}

		}

	};

	editimage.fabricaImagem = {

		criar: function(arquivoImagem){

			criarFabricaImagem = {};

		}

	};

	it('Deve inicializar o editimage', function(){


		var divContainer = document.createElement('div');
		divContainer.classList.add('container');

		var div = document.createElement('div');
		div.setAttribute('id', 'div1');
		div.classList.add('editimage');

		var body = document.getElementsByTagName('body')[0];

		divContainer.appendChild(div);
		body.appendChild(divContainer);

		editimage.inicializar('div1');

		var expectativa = [];
		expectativa.push('<div id="div1" class="editimage">');
		expectativa.push('<div class="painel-controle">');
		expectativa.push('<label class="botao"><span class="icon icon-selecionar-imagem"></span><input type="file" class="botao-selecionar-imagem"></label>');
		expectativa.push('<button type="button" class="botao botao-retangulo"><span class="icon icon-retangulo"></span></button>');
		expectativa.push('<button type="button" class="botao botao-elipse"><span class="icon icon-elipse"></span></button>');
		expectativa.push('<button type="button" class="botao botao-linha"><span class="icon icon-linha"></span></button>');
		expectativa.push('</div>');
		expectativa.push('<div class="container"><canvas></canvas></div>');
		expectativa.push('</div>');

		expect(expectativa.join('')).toEqual($(body).find('.container').html());

	});

	it('Deve retornar o editimage especificado', function(){


		var divContainer = document.createElement('div');
		divContainer.classList.add('container');

		var div = document.createElement('div');
		div.setAttribute('id', 'div1');
		div.classList.add('editimage');

		var body = document.getElementsByTagName('body')[0];

		divContainer.appendChild(div);
		body.appendChild(divContainer);

		editimage.inicializar('div1');

		var instanciaEditimage = editimage.retornarInstancia('div1');

		expect(instanciaEditimage.contexto).toBeDefined();
		expect(stage).toBeDefined();

	});

	it('Deve inicializar o editimage e executar o evento selecionarImagem e criar uma nova imagem', function(){


		var divContainer = document.createElement('div');
		divContainer.classList.add('container');

		var div = document.createElement('div');
		div.setAttribute('id', 'div2');
		div.classList.add('editimage');

		var body = document.getElementsByTagName('body')[0];

		divContainer.appendChild(div);
		body.appendChild(divContainer);

		editimage.inicializar('div2');

       var div = document.getElementById('div2');

       var botao = div.getElementsByClassName('botao-selecionar-imagem')[0];

       botao.onchange();

		expect(eventoSelecionarImagem).toBeDefined();
		expect(criarFabricaImagem).toBeDefined();

	});

	it('Deve inicializar o editimage e executar o evento criarRetangulo e criar um novo retangulo', function(){


		var divContainer = document.createElement('div');
		divContainer.classList.add('container');

		var div = document.createElement('div');
		div.setAttribute('id', 'div3');
		div.classList.add('editimage');

		var body = document.getElementsByTagName('body')[0];

		divContainer.appendChild(div);
		body.appendChild(divContainer);

		editimage.inicializar('div3');

       var div = document.getElementById('div3');

       var botao = div.getElementsByClassName('botao-retangulo')[0];

       botao.onclick();

		expect(eventoCriarRetangulo).toBeDefined();

	});

	it('Deve inicializar o editimage e executar o evento criarElipse e criar uma nova elipse', function(){


		var divContainer = document.createElement('div');
		divContainer.classList.add('container');

		var div = document.createElement('div');
		div.setAttribute('id', 'div4');
		div.classList.add('editimage');

		var body = document.getElementsByTagName('body')[0];

		divContainer.appendChild(div);
		body.appendChild(divContainer);

		editimage.inicializar('div4');

       var div = document.getElementById('div4');

       var botao = div.getElementsByClassName('botao-elipse')[0];

       botao.onclick();

		expect(eventoCriarElipse).toBeDefined();

	});

	it('Deve inicializar o editimage e executar o evento criarLinha e criar uma nova linha', function(){


		var divContainer = document.createElement('div');
		divContainer.classList.add('container');

		var div = document.createElement('div');
		div.setAttribute('id', 'div5');
		div.classList.add('editimage');

		var body = document.getElementsByTagName('body')[0];

		divContainer.appendChild(div);
		body.appendChild(divContainer);

		editimage.inicializar('div5');

       var div = document.getElementById('div5');

       var botao = div.getElementsByClassName('botao-linha')[0];

       botao.onclick();

		expect(eventoCriarLinha).toBeDefined();

	});
});
