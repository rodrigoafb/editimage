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

	it('Deve desenhar um retangulo', function(){

		var shape = new createjs.Shape();
		var rect = {};

		shape.graphics.drawRect = function(x,y,w,h){
			rect.x = x;
			rect.y = y;
			rect.w = w;
			rect.h = h;
		};

		var retangulo = editimage.fabricaRetangulo.criar(observer, shape);

		retangulo.desenhar();

		expect(50).toEqual(rect.x);
		expect(50).toEqual(rect.y);
		expect(100).toEqual(rect.w);
		expect(100).toEqual(rect.h);

	});

});