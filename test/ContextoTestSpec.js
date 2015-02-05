'use strict';

describe('Contexto - ', function () {
    var stage = {}
    , mouseOver = false
    , notificar = false;
    
    stage.enableMouseOver = function(){
        mouseOver = true;
    };
    
    it('Deve retornar uma nova instancia do objeto de contexto', function(){
       
        var eventos = { };
        
        stage.canvas = {
            
            width: 100,
            height: 500
            
        };
        
        stage.canvas.addEventListener = function(evento, callback, bool){
            eventos[evento] = callback;
        };
        
        var contexto = editimage.fabricaContexto.criar(stage);
        
        expect(contexto).toBeDefined();
        expect(true).toEqual(mouseOver);
        expect(100).toEqual(contexto.largura);
        expect(500).toEqual(contexto.altura);

    });
    
        
    it('Deve aplicar o focus e o evento keydown no objeto do stage ao ser clicado, e excluí-lo do sistema ao apertar del', function(){
        
        var eventos = { }
        , focus = false
        , retornoRemove = false
        , update = false
        , redimensionadorShape = false
        , quantidadeObjetos
        , redimensionadores
        , objetoRetornado = {
             retornarShape: function(){},
             selecionado: false,
             retornarRedimensionadores: function(){
                 return redimensionadores;
             }
        };
        
        redimensionadores = [{retornarShape: function(){ return redimensionadorShape = true; }}
                             ,{retornarShape: function(){ return redimensionadorShape = true;}}
                             ,{retornarShape: function(){ return redimensionadorShape = true;}}
                             ,{retornarShape: function(){ return redimensionadorShape = true;}}]
        
        stage.canvas = {};
        stage.canvas.addEventListener = function(evento, callback, bool){
            eventos[evento] = callback;
        };
        
        stage.addChild = function (a) {
        };
        
        stage.update = function(){
            update = true;
        };
        
        stage.removeChild = function(objeto){
            return retornoRemove = true;
        };
        
        var contexto = editimage.fabricaContexto.criar(stage);
        contexto.adicionarObjeto(objetoRetornado);
        contexto.adicionarObjeto(
            {retornarShape: function(){},
             selecionado: true,
             retornarRedimensionadores: function(){
                return redimensionadores;
             }
        });
        
        for(var i = 0; i< redimensionadores.length; i++){
            contexto.adicionarObjeto(redimensionadores[i]);
        };
        
        eventos['click']({target:{ focus: function(){
            return focus = true;
        }}});
        
        eventos['keydown']({keyCode: 46});
        
        quantidadeObjetos = contexto.retornarObjetos();

        expect(true).toEqual(focus);
        expect(true).toEqual(update);
        expect(true).toEqual(retornoRemove);
        expect(true).toEqual(redimensionadorShape);
        expect(1).toEqual(quantidadeObjetos.length);
        expect(true).toEqual(quantidadeObjetos[0] === objetoRetornado);

    });
    
    it('Deve adicionar e retornar um novo objeto do contexto', function(){
        
        var contexto = editimage.fabricaContexto.criar(stage), retorno, update = false;
        
        stage.addChild = function (a) {
            retorno = a;
        };
        stage.update = function(){
            update = true;
        };
        
        contexto.adicionarObjeto({retornarShape: function(){
            return "shape";
        }});
        
        var objetosRetorno = contexto.retornarObjetos();
        
        expect(objetosRetorno.length).toEqual(1);
        expect("shape").toEqual(retorno);
        expect(true).toEqual(update);
    });
    
    it('Deve retornar o observer', function(){
       
        var contexto = editimage.fabricaContexto.criar(stage);
        
        var observer = contexto.retornarObserver();
        
        expect(observer).toBeDefined();
    });
    
    it('Deve retornar uma exceção caso o stage não seja passado', function(){
        expect(function(){ editimage.fabricaContexto.criar(); }).toThrow(new Error('Informe o stage.'));
    });
    
    it('Deve adicionar um callback no observer do contexto', function(){
        notificar = false;
        
        var contexto = editimage.fabricaContexto.criar(stage);
        
        stage.update = function(){
            notificar = true;  
        };
        
        var observer = contexto.retornarObserver();

        observer.notificar();
        
        expect(true).toEqual(notificar);
        
    });
    
    it('Quando selecionar um objeto os outros devem ser deselecionados', function(){
        
        var contexto = editimage.fabricaContexto.criar(stage);
        
        var objeto = {retornarShape: function(){
                            return "shape";
                      },
                      selecionado: true
                    };
        
        var objeto2 = {retornarShape: function(){ 
                            return "shape";
                        },
                       selecionado: true
                     };
        
        contexto.adicionarObjeto(objeto);
        contexto.adicionarObjeto(objeto2);
        
        var observer = contexto.retornarObserver();
        
        observer.notificar(objeto);
       
        var objetos = contexto.retornarObjetos();
        expect(true).toEqual(objetos[0].selecionado);
        expect(false).toEqual(objetos[1].selecionado);
        
        observer.notificar();
        
        expect(true).toEqual(objetos[0].selecionado);
        expect(false).toEqual(objetos[1].selecionado);
       
    });
    
});