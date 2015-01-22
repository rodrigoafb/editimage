'use strict';

describe('Painel - ', function(){

	var objetoRetornado = {Codigo: 1};
	var painel;


	it('Deve retornar uma instancia de um objeto Painel ', function() {

		painel = editimage.fabricaPainelControle.criar();

		expect(painel).toBeDefined();

	})

	// it('Deve retornar um retangulo quadrado', function(){

	// 	var painel = editimage.fabricaPainelControle.criar();

	// 	painel.retornarRetangulo();


	// });


})