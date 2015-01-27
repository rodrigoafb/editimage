'use strict';

describe('Painel - ', function () {

	var contexto = {}, observer, painel;


	beforeEach(function () {
        
		contexto.retornarObserver = function () {
			return {
				notificar: function () { }
			};
		};

		contexto.retornarObjetos = function () {

			return contexto.objetos;

		};

		contexto.adicionarObjeto = function () {
			contexto.objetos.push({});

		};

	});

	it('Deve lança uma exceção se a dependencia do contexto não for passada', function(){

		expect(function(){ editimage.fabricaPainelControle.criar(); }).toThrow(new Error('Informe o contexto.'));

	});

	it('Deve retornar uma instancia de um objeto Painel ', function() {

		painel = editimage.fabricaPainelControle.criar(contexto);

		expect(painel).toBeDefined();

	})


	//Pesquisar como testar isso
	it('Deve selecionar uma imagem', function(){

		//var Blobbuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

		//var blob = new Blobbuilder([blobString], {type: 'image/jpeg'});

		//var file = new File([blob], 'nome');

		//var painel = editimage.fabricaPainelControle.criar(contexto);

		//painel.selecionarImagem(file);     

	});


	it('Deve criar um retangulo e adicionar na lista de objetos', function(){

		contexto.objetos = [];

		var painel = editimage.fabricaPainelControle.criar(contexto);

		painel.criarRetangulo();

		var retornoContext = painel.retornarContexto();

		var objetos = retornoContext.retornarObjetos();

		expect(objetos.length).toEqual(1);

	});

	it('Deve criar uma elipse e adicionar na lista de objetos', function(){

        contexto.objetos = [];

        var painel = editimage.fabricaPainelControle.criar(contexto);
        painel.criarElipse();

        var retornoContext = painel.retornarContexto();

        var objetos = retornoContext.retornarObjetos();

        expect(objetos.length).toEqual(1);

	});

	it('Deve retornar uma linha e adicionar na lista de objetos', function(){
        
        contexto.objetos = [];
        
		var painel = editimage.fabricaPainelControle.criar(contexto);
		painel.criarLinha();

		var retornoContext = painel.retornarContexto();
        
        var objetos = retornoContext.retornarObjetos();
        
		expect(objetos.length).toEqual(1);

	});

})