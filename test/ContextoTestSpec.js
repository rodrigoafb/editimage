'use strict';

describe('Contexto - ', function () {
    var stage = {}
    , mouseOver = false
    , notificar = false
    , painelFerramentas = {}
    , observer
    , textoObjeto;
    
    beforeEach(function(){
        
        textoObjeto = {
                    definirLarguraText: function(medida){
                        textoObjeto.largura = medida;
                    },
                    definirLarguraDOMElement: function(largura){
                        textoObjeto.larguraDOMElement = largura;
                    },
                    definirAltura: function(medida){
                        textoObjeto.altura = medida;
                    }
                };
        
		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
               
	});
    
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
        
        var div = document.createElement('div');
        div.setAttribute('id', 'divTeste')
        var textArea = document.createElement('textarea');
        div.appendChild(textArea);
        document.body.appendChild(div);
        
        var eventos = { }
        , focus = false
        , retornoRemove = false
        , update = false
        , redimensionadorShape = false
        , quantidadeObjetos
        , redimensionadores
        , text = { }
        , domElement = { 
            htmlElement: textArea
        }
        , textoObjeto = {
                    retornarCreateObjeto: function(){
                        
                        return [text, domElement];
                    }
                }
        , objetoRetornado = {
             retornarCreateObjeto: function(){},
             selecionado: true,
             retornarRedimensionadores: function(){
                 return redimensionadores;
             },
            retornarTextoObjeto: function(){
                return textoObjeto;
            }
        }
        , objetoRetornado2 = {retornarCreateObjeto: function(){},
             selecionado: false,
             retornarRedimensionadores: function(){
                return redimensionadores;
             }
        };
        
        redimensionadores = [{retornarCreateObjeto: function(){ return redimensionadorShape = true;}}
                            ,{retornarCreateObjeto: function(){ return redimensionadorShape = true;}}
                            ,{retornarCreateObjeto: function(){ return redimensionadorShape = true;}}
                            ,{retornarCreateObjeto: function(){ return redimensionadorShape = true;}}];
        
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
        contexto.adicionarObjeto(objetoRetornado);
        contexto.adicionarObjeto(objetoRetornado2);
        contexto.adicionarObjeto(textoObjeto);
        
        for(var i = 0; i< redimensionadores.length; i++){
            contexto.adicionarObjeto(redimensionadores[i]);
        };
        
        eventos['click']({target:{ focus: function(){
            return focus = true;
        }}});
        
        objetoRetornado2.selecionado = true;
        
        expect('<textarea></textarea>').toEqual(document.getElementById('divTeste').innerHTML);
        
        eventos['keydown']({keyCode: 46});
        
        quantidadeObjetos = contexto.retornarObjetos();
        
        expect(false).toEqual(painelFerramentas.visivel);
        expect(true).toEqual(focus);
        expect(true).toEqual(update);
        expect(true).toEqual(retornoRemove);
        expect(true).toEqual(redimensionadorShape);
        expect(1).toEqual(quantidadeObjetos.length);
        expect(true).toEqual(quantidadeObjetos[0] === objetoRetornado2);
        expect('').toEqual(document.getElementById('divTeste').innerHTML);

    });
    
    it('Deve adicionar e retornar um novo objeto do contexto', function(){
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas), retorno, update = false;
        
        stage.addChild = function (a) {
            retorno = a;
        };
        stage.update = function(){
            update = true;
        };
        
        contexto.adicionarObjeto({retornarCreateObjeto: function(){
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
        
        var objeto = {retornarCreateObjeto: function(){
                            return "shape";
                      },
                      selecionado: true,
                      retornarFerramentas: function(){}
                    };
        
        var objeto2 = {retornarCreateObjeto: function(){ 
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
            retornarCreateObjeto: function(){
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
    
    it('Deve adicionar mais de um objeto mais de um objeto ao mesmo tempo', function(){
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas)
        , retorno = []
        , update = false;
        
        stage.addChild = function (a) {
            retorno.push(a);
        };
        stage.update = function(){
            update = true;
        };
        
        contexto.adicionarObjeto({retornarCreateObjeto: function(){
            return [{},{},{}];
        }});
        
        var objetosRetorno = contexto.retornarObjetos();
        
        expect(objetosRetorno.length).toEqual(1);
        expect(retorno.length).toEqual(3);
        expect(true).toEqual(update);
        
    });
    
    it('Deve retornar o stage', function(){
        
        var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas);
        
        expect(stage).toEqual(contexto.retornarStage());
        
    });
    
    //it('Quando houver um click no stage deve deselecionar os objetos selecionados', function(){
    //    
    //    var evento = {};
    //
	//	stage.canvas.addEventListener = function(pEvento, callback){
    //
    //        evento[pEvento] = callback;
    //
    //    };
    //
	//	stage.canvas.dispararEvento = function(pEvento){
    //
    //        evento[pEvento]({ target: { focus: function(){}}});
    //
    //    };
    //    
    //    var contexto = editimage.fabricaContexto.criar(stage, painelFerramentas)
    //    contexto.adicionarObjeto({ selecionado: true, retornarCreateObjeto: function(){}});
    //    contexto.adicionarObjeto({ selecionado: true, retornarCreateObjeto: function(){}});
    //    
    //    stage.canvas.dispararEvento('click');
    //    
    //    expect(false).toEqual(contexto.retornarObjetos()[0].selecionado);
    //    expect(false).toEqual(contexto.retornarObjetos()[1].selecionado);
    //    
    //    
    //});
    
    it('Deve Gerar Projeto Json', function(){
        
        var context = editimage.fabricaContexto.criar(stage, painelFerramentas);        
        
        var contextoJsonRetorno = context.gerarProjetoJson();
        
        expect(contextoJsonRetorno).toEqual('[]');
        
        context.adicionarObjeto({retornarCreateObjeto: function(){return [{}];}})
        
        contextoJsonRetorno = context.gerarProjetoJson();
        
        expect(contextoJsonRetorno).toEqual('[]');
                
        var redimensionadoresRetangulo = [{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6}];
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadoresRetangulo, textoObjeto);
        
        retangulo.selecionado = true;
        retangulo.bordaCor = '#fff';
        retangulo.bordaLargura = 100;
        retangulo.coordenadaX = 10;
        retangulo.coordenadaY = 55;
        retangulo.altura = 10;
        retangulo.largura = 10;
        retangulo.retornarCreateObjeto = function(){return [{}];};
        
        context.adicionarObjeto(retangulo);
                
        var retanguloRetornoExpect = {
            entidade: 'Retangulo',
            estado: {
                selecionado: true,
                bordaCor: '#fff',
                bordaLargura: 100,
                coordenadaX: 10,
                coordenadaY: 55,
                altura: 10,
                largura: 10   
            }
            
        };
                
        contextoJsonRetorno = context.gerarProjetoJson();
        
        var expectJson = JSON.stringify([retanguloRetornoExpect]);
        
        expect(contextoJsonRetorno).toEqual(expectJson);        
        
        
    });
    
});