'use strict';

describe('Retangulo - ', function() {

	var observer, redimensionadores;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6}];
        
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
    
    it('Deve posicionar os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawRect = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
        
        expect(47).toEqual(redimensionadores[0].coordenadaX);
        expect(47).toEqual(redimensionadores[0].coordenadaY);
        
        expect(97).toEqual(redimensionadores[1].coordenadaX);
        expect(47).toEqual(redimensionadores[1].coordenadaY);
        
        expect(147).toEqual(redimensionadores[2].coordenadaX);
        expect(47).toEqual(redimensionadores[2].coordenadaY);
        
        expect(47).toEqual(redimensionadores[3].coordenadaX);
        expect(97).toEqual(redimensionadores[3].coordenadaY);
        
        expect(147).toEqual(redimensionadores[4].coordenadaX);
        expect(97).toEqual(redimensionadores[4].coordenadaY);
        
        expect(47).toEqual(redimensionadores[5].coordenadaX);
        expect(147).toEqual(redimensionadores[5].coordenadaY);
        
        expect(97).toEqual(redimensionadores[6].coordenadaX);
        expect(147).toEqual(redimensionadores[6].coordenadaY);
        
        expect(147).toEqual(redimensionadores[7].coordenadaX);
        expect(147).toEqual(redimensionadores[7].coordenadaY);
        
    });
    
    it('Deve reposicionar os redimensionadores caso o retangulo seja movido', function(){
        
        var shape = new createjs.Shape();
        var evento = {};
        
        shape.graphics.drawRect = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        shape.on = function(e, callback){            
            evento[e] = callback;            
        };
        
        shape.dispararEventoMouseDown = function(){
            evento['mousedown']({stageX: 60, stageY: 60 });
        };
        
        shape.dispararEventoPressMove = function(){
            evento['pressmove']({stageX: 70, stageY: 70 });
        };
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
        expect(47).toEqual(redimensionadores[0].coordenadaX);
        expect(47).toEqual(redimensionadores[0].coordenadaY);
        
        expect(97).toEqual(redimensionadores[1].coordenadaX);
        expect(47).toEqual(redimensionadores[1].coordenadaY);
        
        expect(147).toEqual(redimensionadores[2].coordenadaX);
        expect(47).toEqual(redimensionadores[2].coordenadaY);
        
        expect(47).toEqual(redimensionadores[3].coordenadaX);
        expect(97).toEqual(redimensionadores[3].coordenadaY);
        
        expect(147).toEqual(redimensionadores[4].coordenadaX);
        expect(97).toEqual(redimensionadores[4].coordenadaY);
        
        expect(47).toEqual(redimensionadores[5].coordenadaX);
        expect(147).toEqual(redimensionadores[5].coordenadaY);
        
        expect(97).toEqual(redimensionadores[6].coordenadaX);
        expect(147).toEqual(redimensionadores[6].coordenadaY);
        
        expect(147).toEqual(redimensionadores[7].coordenadaX);
        expect(147).toEqual(redimensionadores[7].coordenadaY);        
        
        var shapeRetangulo = retangulo.retornarShape();
        
        shapeRetangulo.dispararEventoMouseDown();
        shapeRetangulo.dispararEventoPressMove();        
        
        expect(57).toEqual(redimensionadores[0].coordenadaX);
        expect(57).toEqual(redimensionadores[0].coordenadaY);
        
        expect(107).toEqual(redimensionadores[1].coordenadaX);
        expect(57).toEqual(redimensionadores[1].coordenadaY);
        
        expect(157).toEqual(redimensionadores[2].coordenadaX);
        expect(57).toEqual(redimensionadores[2].coordenadaY);
        
        expect(57).toEqual(redimensionadores[3].coordenadaX);
        expect(107).toEqual(redimensionadores[3].coordenadaY);
        
        expect(157).toEqual(redimensionadores[4].coordenadaX);
        expect(107).toEqual(redimensionadores[4].coordenadaY);
        
        expect(57).toEqual(redimensionadores[5].coordenadaX);
        expect(157).toEqual(redimensionadores[5].coordenadaY);
        
        expect(107).toEqual(redimensionadores[6].coordenadaX);
        expect(157).toEqual(redimensionadores[6].coordenadaY);
        
        expect(157).toEqual(redimensionadores[7].coordenadaX);
        expect(157).toEqual(redimensionadores[7].coordenadaY);   
        
    });

});