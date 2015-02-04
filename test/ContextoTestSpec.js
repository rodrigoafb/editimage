'use strict';

describe('Contexto - ', function () {
    var stage = {}
    , mouseOver = false
    , notificar = false
    , painelFerramentas = {};
    
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
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        
        expect(contexto).toBeDefined();
        expect(true).toEqual(mouseOver);
        expect(100).toEqual(contexto.largura);
        expect(500).toEqual(contexto.altura);

    });
    
        
    it('Quando for pressionado a tecla delete, deve remover o objeto selecionado', function(){
        
        var eventos = { }
        , focus = false
        , retornoRemove = false
        , update = false
        , redimensionadores = false
        , objetosRetorno;
        
        painelFerramentas.visivel = true;
        
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
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        contexto.adicionarObjeto(
            {retornarShape: function(){},
             selecionado: false,
             retornarRedimensionadores: function(){
                 return [{retornarShape: function(){
                        
                 }}]
             }
        });
        contexto.adicionarObjeto(
            {retornarShape: function(){},
             selecionado: true,
             retornarRedimensionadores: function(){
                 return [{retornarShape: function(){
                        return redimensionadores = true;
                 }}]
             }
        });
        
        eventos['click']({target:{ focus: function(){
            return focus = true;
        }}});
        
        eventos['keydown']({keyCode: 46});
        
        objetosRetorno = contexto.retornarObjetos();
        
        expect(false).toEqual(painelFerramentas.visivel);
        expect(true).toEqual(focus);
        expect(true).toEqual(update);
        expect(true).toEqual(retornoRemove);
        expect(true).toEqual(redimensionadores);
        expect(1).toEqual(objetosRetorno.length);
        
        
    });
    
    it('Deve adicionar e retornar um novo objeto do contexto', function(){
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas), retorno, update = false;
        
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
       
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        
        var observer = contexto.retornarObserver();
        
        expect(observer).toBeDefined();
    });
    
    it('Deve lançar uma exceção caso o stage não seja passado', function(){
        expect(function(){ editimage.fabricaContexto.criar(); }).toThrow(new Error('Informe o stage.'));
    });
    
    it('Deve lançar uma exceção caso o painelFerramentas não seja informado', function(){
        
        expect(function(){ editimage.fabricaContexto.criar(stage); }).toThrow(new Error('Informe o painel de ferramentas.'));
        
    });
    
    it('Deve adicionar um callback no observer do contexto', function(){
        notificar = false;
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        
        stage.update = function(){
            notificar = true;  
        };
        
        var observer = contexto.retornarObserver();

        observer.notificar();
        
        expect(true).toEqual(notificar);
        
    });
    
    it('Quando selecionar um objeto os outros devem ser deselecionados', function(){
        
        painelFerramentas.adicionarOuSubstituirFerramentas = function(){};
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        
        var objeto = {retornarShape: function(){
                            return "shape";
                      },
                      selecionado: true,
                      retornarFerramentas: function(){}
                    };
        
        var objeto2 = {retornarShape: function(){ 
                            return "shape";
                        },
                       selecionado: true,
                       retornarFerramentas: function(){}
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
    
    it('Quando um objeto for selecionado deve renderizar o as ferramentas do objeto selecionado', function(){
        
        var ferramentasAdicionadas;
        
        painelFerramentas.adicionarOuSubstituirFerramentas = function(ferramentas){
            
            ferramentasAdicionadas = ferramentas;
            
        };
        
        painelFerramentas.visivel = false;
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        
        var objeto = {
            retornarShape: function(){
                    return "shape";
              },
              selecionado: true,
              retornarFerramentas: function(){

                  var div = document.createElement('div');
                  div.innerHTML = '<span></span>';

                  return div;

              }
        };
        
        contexto.adicionarObjeto(objeto);
        
        var observer = contexto.retornarObserver();
        
        expect(false).toEqual(painelFerramentas.visivel);
        
        observer.notificar(objeto);
        
        expect('<span></span>').toEqual(ferramentasAdicionadas.innerHTML);
        
        expect(true).toEqual(painelFerramentas.visivel);
        
    });
    
});