'use strict';

describe('Elipse - ', function(){

	var observer;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

	});

	it('Deve criar um objeto Elipse', function(){


		var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape());

		expect(elipse.retornarShape).toBeDefined();
		expect(true).toEqual(Elipse.prototype instanceof EditimageObjeto);

	});

	it('Deve desenhar um elipse', function(){

		var shape = new createjs.Shape();
		var elip = {};

		shape.graphics.drawEllipse = function(x,y,w,h){
			elip.x = x;
			elip.y = y;
			elip.w = w;
			elip.h = h;

		};

		var elipse  = editimage.fabricaElipse.criar(observer, shape);


		elipse.desenhar();

		expect(50).toEqual(elip.x);
		expect(50).toEqual(elip.y);
		expect(150).toEqual(elip.w);
		expect(100).toEqual(elip.h);
	});

});