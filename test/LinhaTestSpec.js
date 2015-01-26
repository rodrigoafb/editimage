'use strict';

describe('Linha - ', function(){

	var observer;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

	});

	it('Deve criar um objeto Linha', function(){


		var linha = editimage.fabricaLinha.criar(observer, new createjs.Shape());

		expect(linha.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Linha.prototype instanceof editimage.EditimageObjeto);

	});

	it('Deve desenhar um linha', function(){

		var shape = new createjs.Shape();
		var line = {}, move = {};
        
		shape.graphics.setStrokeStyle = function(){
            return { command: {} };
		};
        
        shape.graphics.beginStroke = function(){
            return { command: {} };
		};
        
        shape.graphics.moveTo = function(x,y){
			move.x = x;
			move.y = y;
		};
        
        shape.graphics.lineTo = function(x,y){
			line.x = x;
			line.y = y;
		};

		var linha  = editimage.fabricaLinha.criar(observer, shape);


		linha.desenhar();
        
		expect(150).toEqual(line.x);
		expect(150).toEqual(line.y);
        expect(50).toEqual(move.x);
		expect(50).toEqual(move.y);
	});

});