'use strict';

describe('Elipse - ', function(){

	var observer, redimensionadores;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{largura:6},{largura:6},{largura:6},{largura:6}];

	});
    
    it('A fábrica de elipses deve retornar a quantidade de redimensionadores necessários para criar uma elipse', function(){
        
        expect(editimage.fabricaElipse.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaElipse.retornarQuantidadeRedimensionadores()).toEqual(4);
        
        
    });
    
    it('Deve lançar uma exceção ao criar uma elipse sem os redimensionadores', function(){
       
        expect(function(){editimage.fabricaElipse.criar(observer, new createjs.Shape())}).toThrow(new Error('Informe os redimensionadores'));
        
    });
    
    it('Deve lançar uma exceção ao criar uma elipse caso não tenham 4 redimensionadores', function(){
        
        expect(function(){editimage.fabricaElipse.criar(observer, new createjs.Shape(), [{}])}).toThrow(new Error('Informe 4 redimensionadores'));
        
    });
    
	it('Deve criar um objeto Elipse', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawRect = function(x,y,w,h){
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};

		var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores);

		expect(elipse.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Elipse.prototype instanceof editimage.EditimageObjeto);

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

		var elipse  = editimage.fabricaElipse.criar(observer, shape, redimensionadores);


		elipse.desenhar();

		expect(50).toEqual(elip.x);
		expect(50).toEqual(elip.y);
		expect(150).toEqual(elip.w);
		expect(100).toEqual(elip.h);
	});
    
    it('Deve aplicar e remover a seleção ao elipse', function(){
        
        var shape = new createjs.Shape();
		var evento = {};

		shape.addEventListener = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]();
        };

		var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);

		var shapeElipse = elipse.retornarShape();

		shapeElipse.dispararEvento('click');
        
        expect(true).toEqual(redimensionadores[0].visible);
        expect(true).toEqual(redimensionadores[1].visible);
        expect(true).toEqual(redimensionadores[2].visible);
        expect(true).toEqual(redimensionadores[3].visible);
        
        elipse.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visible);
        expect(false).toEqual(redimensionadores[1].visible);
        expect(false).toEqual(redimensionadores[2].visible);
        expect(false).toEqual(redimensionadores[3].visible);
        
        
    });
    
    it('Deve posicionar os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawEllipse = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        var objeto = new editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        var redimensionador3 = redimensionadores[2];
        var redimensionador4 = redimensionadores[3];
        
        expect(122).toEqual(redimensionador1.coordenadaX);
        expect(47).toEqual(redimensionador1.coordenadaY);
        
        expect(197).toEqual(redimensionador2.coordenadaX);
        expect(97).toEqual(redimensionador2.coordenadaY);
        
        expect(122).toEqual(redimensionador3.coordenadaX);
        expect(147).toEqual(redimensionador3.coordenadaY);
        
        expect(47).toEqual(redimensionador4.coordenadaX);
        expect(97).toEqual(redimensionador4.coordenadaY);
        
    })

});