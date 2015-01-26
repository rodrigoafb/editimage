'use strict';

describe('Retangulo - ', function(){

	var observer;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

	});

	it('Deve criar um objeto Retangulo', function(){


		var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape());

		expect(retangulo.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Retangulo.prototype instanceof editimage.EditimageObjeto);

	});

	// it('Deve desenhar um retangulo', function(){

	// 	var shape = new createjs.Shape();

	// 	shape.graphics.drawRect = function(){
	// 		return {
	// 			command: strokeCommand
	// 		};
	// 	};

	// });

});