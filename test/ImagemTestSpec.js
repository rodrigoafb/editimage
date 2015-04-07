'use strict';
describe('Imagem - ', function(){

	var observer = {};

	beforeEach(function(){

		observer.notificar = function(){};

		editimage.fabricaImagem = editimage.fabricaImagemBase;
		
	});

	it('Deve criar um objeto Imagem',function(){

		var imagem = editimage.fabricaImagem.criar(observer, new createjs.Shape(), "imagem.jpg");

		expect(imagem.retornarCreateObjeto).toBeDefined();
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
        
        var shape = imagem.retornarCreateObjeto();
        
        expect(true).toEqual(shape === objeto)
        
    });
    
    it('Deve escalar a imagem com base na largura e altura informados', function(){
        
        var objeto = {
            image: {
                width: 1000,
                height: 500
            }
        };
        
        var shape = new createjs.Shape();
        createjs.Bitmap = function(parametro){
            return objeto;
        };
        
        var imagem = editimage.fabricaImagem.criar(observer, shape, "imagem.jpg");
        
        imagem.escalar(850, 658);
        
        expect(0.85).toEqual(objeto.scaleX);
        expect(0.85).toEqual(objeto.scaleY);
        
    });
    
    it('Se ambas as dimensões da imagem forem menor que as dimensões do canvas', function(){
        
        var objeto = {
            image: {
                width: 250,
                height: 250
            }
        };
        
        var shape = new createjs.Shape();
        createjs.Bitmap = function(parametro){
            return objeto;
        };
        
        var imagem = editimage.fabricaImagem.criar(observer, shape, "imagem.jpg");
        
        imagem.escalar(500, 500);
        
        expect(1).toEqual(objeto.scaleX);
        expect(1).toEqual(objeto.scaleY);
        
    });
    
    it('Deve centralizar uma imagem no eixo x se a mesma tiver a largura menor que a largura do canvas', function(){
        
        var objeto = {
            image: {
                width: 500,
                height: 1000
            }
        };
        
        var shape = new createjs.Shape();
        createjs.Bitmap = function(parametro){
            return objeto;
        };
        
        var imagem = editimage.fabricaImagem.criar(observer, shape, "imagem.jpg");
        
        imagem.escalar(850, 658);
        imagem.centralizar(850, 658);
        
        expect(260.5).toEqual(objeto.x);
        expect(0).toEqual(objeto.y);
        
    });
    
    it('Deve retornar um objeto com as propriedades publicas da Imagem', function(){
        
        var shape = new createjs.Shape();
        var imagem = editimage.fabricaImagem.criar(observer, shape, "imagem.jpg");
        
        imagem.selecionado = true;
        imagem.bordaCor = '#fff';
        imagem.bordaLargura = 100;
        imagem.coordenadaX = 10;
        imagem.coordenadaY = 55;
        
        var propriedadesImagem = imagem.retornarPropriedades();
        
        var imagemRetornoExpect = {
            entidade: 'Imagem',
            estado: {
                selecionado: true,
                bordaCor: '#fff',
                bordaLargura: 100,
                coordenadaX: 10,
                coordenadaY: 55,
                dataUrl: 'imagem.jpg'
            }
        };
        
        var propriedadesImagemJson = JSON.stringify(propriedadesImagem);
        
        var imagemRetornoExpectJson = JSON.stringify(imagemRetornoExpect);
        
        expect(propriedadesImagemJson).toEqual(imagemRetornoExpectJson);    
    
    });
    

});











































