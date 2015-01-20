'use strict';

describe('Inicialização - ', function(){


	it('Deve inicializar o editimage', function(){

		var canvasElemento1 = document.createElement('canvas');
		canvasElemento1.setAttribute('id', 'canvasId1');

		var canvasElemento2 = document.createElement('canvas');
		canvasElemento2.setAttribute('id', 'canvasId2');

		var body = document.getElementsByTagName('body')[0];
		body.appendChild(canvasElemento1);
		body.appendChild(canvasElemento2);

		editimage.inicializar();

		expect(null).not.toEqual(editimage.retornarCanvas('canvasId1'));
		expect(null).not.toEqual(editimage.retornarCanvas('canvasId2'));

	});


});