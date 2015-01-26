'use strict';
describe('Imagem - ', function(){

	var observer = {};

	beforeEach(function(){

		observer.notificar = function(){};

		editimage.fabricaImagem = editimage.fabricaImagemBase;
		
	});

	it('Deve criar um objeto Imagem',function(){

		var imagem = editimage.fabricaImagem.criar(observer, new createjs.Shape());

		expect(imagem.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Imagem.prototype instanceof editimage.EditimageObjeto);

	});
    
    it('Deve desenhar uma imagem', function(){
    
        var shape = new createjs.Shape();
		var elip = {};

		shape.graphics.drawEllipse = function(x,y,w,h){
			elipse.x = x;
			elipse.y = y;
			elipse.w = w;
			elipse.h = h;
		};

		var elipse = editimage.fabricaImagem.criar(observer, shape);

		elipse.desenhar();

		expect(50).toEqual(elipse.x);
		expect(50).toEqual(elipse.y);
		expect(100).toEqual(elipse.w);
		expect(100).toEqual(elipse.h);
        
    });

});