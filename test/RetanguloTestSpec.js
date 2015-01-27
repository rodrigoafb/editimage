'use strict';

describe('Retangulo - ', function() {

	var observer, redimensionadores;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{},{},{},{},{},{},{},{}];

	});

    it('A fábrica de retangulos deve retornar a quantidade de redimensionadores necessários para criar um retangulo', function(){
        
        expect(editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores()).toEqual(8);
        
        
    });
    
    it('Deve lançar uma exceção ao criar um retangulo sem os redimensionadores', function(){
       
        expect(function(){editimage.fabricaRetangulo.criar(observer, new createjs.Shape())}).toThrow(new Error('Informe os redimensionadores'));
        
    });
    
    it('Deve lançar uma exceção ao criar um retangulo caso não tenham 8 redimensionadores', function(){
        
        expect(function(){editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), [{}])}).toThrow(new Error('Informe 8 redimensionadores'));
        
    });
    
	it('Deve criar um objeto Retangulo', function(){
            

		var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);

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

		var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);

		retangulo.desenhar();

		expect(50).toEqual(rect.x);
		expect(50).toEqual(rect.y);
		expect(100).toEqual(rect.w);
		expect(100).toEqual(rect.h);

	});

});