'use strict';

describe('Elipse - ', function(){

	var observer, redimensionadores;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{},{},{},{}];

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

});