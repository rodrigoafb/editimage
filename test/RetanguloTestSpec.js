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
        
        editimage.fabricaRetangulo = editimage.fabricaRetanguloBase;

        
	});

    it('A fábrica de retangulos deve retornar a quantidade de redimensionadores necessários para criar um retangulo', function(){
        
        expect(editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores()).toEqual(8);
        
        
    });
    
    it('Deve lançar uma exceção ao criar um retangulo sem os redimensionadores', function(){
        
        expect(function(){
            
            editimage.fabricaRetangulo.criar(observer, new createjs.Shape());
            
        }).toThrow(new Error('Informe os redimensionadores'));
        
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
    
    it('Deve aplicar e remover a seleção ao retangulo', function(){
        
        var shape = new createjs.Shape();
		var evento = {};

		shape.addEventListener = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]();
        };

		var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);

		var shapeRetangulo = retangulo.retornarShape();

		shapeRetangulo.dispararEvento('click');
        
        expect(true).toEqual(redimensionadores[0].visible);
        expect(true).toEqual(redimensionadores[1].visible);
        expect(true).toEqual(redimensionadores[2].visible);
        expect(true).toEqual(redimensionadores[3].visible);
        expect(true).toEqual(redimensionadores[4].visible);
        expect(true).toEqual(redimensionadores[5].visible);
        expect(true).toEqual(redimensionadores[6].visible);
        expect(true).toEqual(redimensionadores[7].visible);
        
        retangulo.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visible);
        expect(false).toEqual(redimensionadores[1].visible);
        expect(false).toEqual(redimensionadores[2].visible);
        expect(false).toEqual(redimensionadores[3].visible);
        expect(false).toEqual(redimensionadores[4].visible);
        expect(false).toEqual(redimensionadores[5].visible);
        expect(false).toEqual(redimensionadores[6].visible);
        expect(false).toEqual(redimensionadores[7].visible);
        
        
    });

});