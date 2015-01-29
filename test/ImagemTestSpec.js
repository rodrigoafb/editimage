'use strict';
describe('Imagem - ', function(){

	var observer = {};

	beforeEach(function(){

		observer.notificar = function(){};

		editimage.fabricaImagem = editimage.fabricaImagemBase;
		
	});

	it('Deve criar um objeto Imagem',function(){

		var imagem = editimage.fabricaImagem.criar(observer, new createjs.Shape(), "imagem.jpg");

		expect(imagem.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Imagem.prototype instanceof editimage.EditimageObjeto);

	});
    
    it('Deve desenhar uma imagem', function(){
    
        var shape
        ,imageUrl;
        
        shape = new createjs.Shape()
        
        createjs.Bitmap = function(parametro){
            imageUrl = parametro;
        };
        
		var imagem = editimage.fabricaImagem.criar(observer, shape, "imagem.jpg");
        
        imagem.desenhar();
        
        expect("imagem.jpg").toEqual(imageUrl);
        
    });
    
        
    it('Ao criar uma imagem, deve-se passar obrigatoriamente o dataUrl no parametro', function(){
        
        var shape = new createjs.Shape();
        
        expect(function(){editimage.fabricaImagem.criar(observer, shape);}).toThrow(new Error('Informe o dataUrl da imagem.'));
        
    });
    
    it('Deve retornar o shape', function(){
        var shape
        ,imageUrl
        , objeto = { };
        
        shape = new createjs.Shape();
        createjs.Bitmap = function(parametro){
            return objeto;
        };
        
        var imagem = editimage.fabricaImagem.criar(observer, shape, "imagem.jpg");
        
        var shape = imagem.retornarShape();
        
        expect(true).toEqual(shape === objeto)
        
    });

});











































