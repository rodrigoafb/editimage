'use strict';

describe('Linha - ', function(){

	var observer, redimensionadores;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

        redimensionadores = [{},{}];
	});

    it('A fábrica de linhas deve retornar a quantidade de redimensionadores necessários para criar uma linha', function(){
        
        expect(editimage.fabricaLinha.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaLinha.retornarQuantidadeRedimensionadores()).toEqual(2);
        
        
    });
    
    it('Deve lançar uma exceção ao criar uma linha sem os redimensionadores', function(){
       
        expect(function(){editimage.fabricaLinha.criar(observer, new createjs.Shape())}).toThrow(new Error('Informe os redimensionadores'));
        
    });
    
    it('Deve lançar uma exceção ao criar uma linha caso não tenham 2 redimensionadores', function(){
        
        expect(function(){editimage.fabricaLinha.criar(observer, new createjs.Shape(), [{}])}).toThrow(new Error('Informe 2 redimensionadores'));
        
    });
    
	it('Deve criar um objeto Linha', function(){


		var linha = editimage.fabricaLinha.criar(observer, new createjs.Shape(), redimensionadores);

		expect(linha.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Linha.prototype instanceof editimage.EditimageObjeto);

	});

	it('Deve desenhar uma linha', function(){

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

		var linha  = editimage.fabricaLinha.criar(observer, shape, redimensionadores);


		linha.desenhar();
        
		expect(150).toEqual(line.x);
		expect(150).toEqual(line.y);
        expect(50).toEqual(move.x);
		expect(50).toEqual(move.y);
	});

});