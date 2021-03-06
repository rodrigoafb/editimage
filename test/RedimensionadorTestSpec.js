'use strict';

describe('Redimensionador - ', function(){
    
    beforeEach(function(){
        
        observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        editimage.fabricaRedimensionador = editimage.fabricaRedimensionadorBase;
        
    });
    
    it('Deve criar um objeto Redimensionador', function(){
        
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, new createjs.Shape());
        
        expect(redimensionador.coordenadaX).toBeDefined();
        expect(redimensionador.coordenadaY).toBeDefined();
        expect(redimensionador.movimentacaoCallback).toBeDefined();
        expect(redimensionador.cursor).toBeDefined();
        expect(false).toEqual(redimensionador.visivel);
        expect(redimensionador.largura).toBeDefined();
        
    });
    
    it('Deve lança uma exceção se não for passado a dependência Shape', function(){
        
        expect(function(){ editimage.fabricaRedimensionador.criar(observer); }).toThrow(new Error('Informe o Shape.'));
        
    });
    
    it('Deve lançar uma exceção se o observer não foi informado', function(){
        
        expect(function(){ editimage.fabricaRedimensionador.criar(); }).toThrow(new Error('Informe o Observer.'));
        
    });
    
    it('Deve desenhar um quadrado com base nas coordenadas passadas', function(){
        
        var shape = new createjs.Shape();
        var quadrado = {};
        
        shape.graphics.drawRect = function(x,y,w,h){
            
            quadrado.x = x;
            quadrado.y = y;
            quadrado.w = w;
            quadrado.h = h;
            
        };
        
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, shape);
        
        expect(0).toEqual(quadrado.x);
        expect(0).toEqual(quadrado.y);
        expect(6).toEqual(quadrado.w);
        expect(6).toEqual(quadrado.h);
        
    });
    
    it('Quando os valores das propriedade coordenadaX e coordendaY alterarem, deve alterar as coordendas do shape', function(){
        
        var shape = new createjs.Shape();
        
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, shape);
        
        redimensionador.coordenadaX = 50;
        redimensionador.coordenadaY = 25;
        
        expect(50).toEqual(shape.x);
        expect(25).toEqual(shape.y);
        
    });
    
    it('Quando os valore das propriedade cursor e visivel alterarem, deve alterar as propriedade do shape', function(){
        
        var shape = new createjs.Shape();
        
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, shape);
        
        redimensionador.cursor = 'move';
        redimensionador.visivel = false;
        
        expect('move').toEqual(shape.cursor);
        expect(false).toEqual(shape.visible);
        
    });
    
    it('Quando mover o Redimensionador de disparar o método movimentacaoCallback', function(){
        
        var shape = new createjs.Shape();
        var evento = {}
           ,coordenadaX = 0
           ,coordenadaY = 0;
        
        shape.on = function(e, callback){
            
            evento[e] = callback;
            
        };
        
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, shape);
        
        redimensionador.movimentacaoCallback = function(evt){
            
            coordenadaX = evt.coordenadaX;
            coordenadaY = evt.coordenadaY;
        };
        
        shape.dispararEventoMouseDown = function(){
            evento['mousedown']({stageX: 60, stageY: 60 });
        };
        
        shape.dispararEventoPressMove = function(){
            evento['pressmove']({stageX: 70, stageY: 70 });
        };
        
        redimensionador.coordenadaX = 50;
        redimensionador.coordenadaY = 50;
        
        shape.dispararEventoMouseDown();
        shape.dispararEventoPressMove();
        
        expect(60).toEqual(redimensionador.coordenadaX);
        expect(60).toEqual(redimensionador.coordenadaY);
        
        expect(60).toEqual(coordenadaX);
        expect(60).toEqual(coordenadaY);
        
    });
    
    it('Deve retornar o shape', function(){
        
        var shape = new createjs.Shape();
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, shape);
        
        var shapeRetornado = redimensionador.retornarCreateObjeto();
        
        expect(true).toEqual(shape === shapeRetornado);
        
    });
    
    it('Deve notificar o observer ao alterar as propriedades coordenadaX e coordenadaY', function(){
        
        var shape = new createjs.Shape();
        
        var redimensionador = editimage.fabricaRedimensionador.criar(observer, shape);
        
        observer.notificado = false;
        
        redimensionador.coordenadaX = 50;
        
        expect(true).toEqual(observer.notificado);
        
        observer.notificado = false;
        
        redimensionador.coordenadaY = 50;
        
        expect(true).toEqual(observer.notificado);
        
    });
    
});