'use strict';

describe('Painel - ', function () {

	var contexto = {}, observer, painel;


	beforeEach(function () {
        
		contexto.retornarObserver = function () {
			return {
				notificar: function () { }
			};
		};

		contexto.retornarObjetos = function () {

			return contexto.objetos;

		};

		contexto.adicionarObjeto = function(objeto){
            contexto.objetos = contexto.objetos || [];
			
            if(objeto) contexto.objetos.push(objeto);
            

		}

	});

	it('Deve lança uma exceção se a dependencia do contexto não for passada', function(){

		expect(function(){ editimage.fabricaPainelControle.criar(); }).toThrow(new Error('Informe o contexto.'));

	});

	it('Deve retornar uma instancia de um objeto Painel ', function() {

		painel = editimage.fabricaPainelControle.criar(contexto);

		expect(painel).toBeDefined();

	})


	//Pesquisar como testar isso
	it('Deve selecionar uma imagem', function(){

		//var Blobbuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

		//var blob = new Blobbuilder([blobString], {type: 'image/jpeg'});

		//var file = new File([blob], 'nome');

		//var painel = editimage.fabricaPainelControle.criar(contexto);

		//painel.selecionarImagem(file);     

	});


	it('Deve criar um retangulo e adicionar na lista de objetos', function(){
		contexto.objetos = [];
        
        var notificado = false;
        
        var observerTeste =  {
				notificar: function () { 
                
                    notificado = true;
                    
                }
			};
        
        var observerParam, shapeParam;
        
        contexto.retornarObserver = function () {
            return observerTeste;
        }
        
        createjs.Shape.prototype.propriedadeTeste = 24;
        
		var painel = editimage.fabricaPainelControle.criar(contexto);
		
        painel.criarRetangulo();
        
		var retornoContext = painel.retornarContexto();

		var objetos = retornoContext.retornarObjetos();
        
        var retornarObserver = retornoContext.retornarObserver();
        
        var retangulo = objetos.filter(function(objeto){
            
            return objeto.retornarEstadoAtual;
            
        })[0];
        
        
        var redimensionadores = objetos.filter(function(objeto){
            
            return !!objeto.retornarEstadoAtual === false;
            
        });
        
        
        retangulo.selecionado = true;
        
		expect(9).toEqual(objetos.length);
        expect(true).toEqual(notificado);
        expect(24).toEqual(retangulo.retornarShape().propriedadeTeste);
        
        expect(false).toEqual(redimensionadores[0].retornarShape() === redimensionadores[1].retornarShape());

	});

	it('Deve criar uma elipse e adicionar na lista de objetos', function(){

        contexto.objetos = [];
        
        var notificado = false;
        
        var observerTeste =  {
				notificar: function () { 
                
                    notificado = true;
                    
                }
			};
        
        var observerParam, shapeParam;
        
        contexto.retornarObserver = function () {
            return observerTeste;
        }

        var painel = editimage.fabricaPainelControle.criar(contexto);
        painel.criarElipse();
        
        var retornoContext = painel.retornarContexto();

		var objetos = retornoContext.retornarObjetos();
        
        var retornarObserver = retornoContext.retornarObserver();
        
        var elipse = objetos.filter(function(objeto){
            
            return objeto.retornarEstadoAtual;
            
        })[0];
        
        var redimensionadores = objetos.filter(function(objeto){
            
            return !!objeto.retornarEstadoAtual === false;
            
        });
        
        elipse.selecionado = true;

        expect(5).toEqual(objetos.length);
        expect(true).toEqual(notificado);
        expect(24).toEqual(elipse.retornarShape().propriedadeTeste);
        expect(false).toEqual(redimensionadores[0].retornarShape() === redimensionadores[1].retornarShape());

	});

	it('Deve retornar uma linha e adicionar na lista de objetos', function(){
        
        contexto.objetos = [];
        
        var notificado = false;
        
        var observerTeste =  {
				notificar: function () { 
                
                    notificado = true;
                    
                }
			};
        
        var observerParam, shapeParam;
        
        contexto.retornarObserver = function () {
            return observerTeste;
        }
        
		var painel = editimage.fabricaPainelControle.criar(contexto);
		painel.criarLinha();
        
        var retornoContext = painel.retornarContexto();

		var objetos = retornoContext.retornarObjetos();
        
        var retornarObserver = retornoContext.retornarObserver();
        
        var linha = objetos.filter(function(objeto){
            
            return objeto.retornarEstadoAtual;
            
        })[0];
        
        var redimensionadores = objetos.filter(function(objeto){
            
            return !!objeto.retornarEstadoAtual === false;
            
        });
        
        
        linha.selecionado = true;

        expect(3).toEqual(objetos.length);
        expect(true).toEqual(notificado);
        expect(24).toEqual(linha.retornarShape().propriedadeTeste);
        expect(false).toEqual(redimensionadores[0].retornarShape() === redimensionadores[1].retornarShape());

	});
    

    

})