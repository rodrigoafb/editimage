'use strict'

describe('TextoObjeto - ', function(){
    
    var observer = {}
        ,notificado = false;

	beforeEach(function(){

		observer.notificar = function(){
            notificado = true;
        };

		editimage.fabricaTextoObjeto = editimage.fabricaTextoObjetoBase;
		
	});
    
    it('Para criar um TextoObjeto é necessario informar o Text do createjs', function(){
        
        expect(function(){
            editimage.TextoObjeto();
            
        }).toThrow(new Error('Informe o Text'));
        
    });
    
    it('Para criar um TextoObjeto é necessario informar o DOMElement do createjs', function(){
        
        expect(function(){
            editimage.TextoObjeto({});
            
        }).toThrow(new Error('Informe o DOMElement'));
        
    });
    
    it('Para criar um TextoObjeto é necessario informar o observer', function(){
        
        expect(function(){
            editimage.TextoObjeto({}, {});
            
        }).toThrow(new Error('Informe o observer'));
        
    });
    
    it('Deve criar um TextoObjeto', function(){
        
        var texto = editimage.fabricaTextoObjeto.criar(observer); 
        
        expect(texto).toBeDefined();
        expect(texto.coordenadaX).toBeDefined();
        expect(texto.coordenadaY).toBeDefined();
        expect(texto.visivel).toBeDefined();        
        expect(texto.edicao).toBeDefined();
        expect(texto.texto).toBeDefined();
        
    });
    
    it('Deve definir a largura da linha do texto e do DOMElement e notificar o observer', function(){
        
        var text = { lineWidth: 0, maxWidth: 0 };
        
        createjs.Text = function(){ 
            
            var self = this;
            
            Object.defineProperties(self, {                
                
                'lineWidth': {
                    get: function(){
                        return text.lineWidth;
                    },
                    set: function(value){
                    
                        text.lineWidth = value;
                    
                    }
                },
                'maxWidth': {
                    get: function(){
                        return text.maxWidth;
                    },
                    set: function(value){
                    
                        text.maxWidth = value;
                    
                    }
                }
                
            });
            
        };   
        
        var htmlElement = {
            style: {
                'maxWidth':0,
                'width':0                
            },
            classList: {
                add: function(){}
            }
        }
        
        createjs.DOMElement = function(){ 
            
            var self = this;            
            
            self.htmlElement = htmlElement;
        };
        
        notificado = false;
        var texto = editimage.fabricaTextoObjeto.criar(observer);       
        
        expect(texto.definirLarguraText).toBeDefined();        
        expect(false).toEqual(notificado);
        
        texto.definirLarguraText(195);        
        
        expect(195).toEqual(text.lineWidth);
        expect(195).toEqual(text.maxWidth);
        
        notificado = false;
        expect(texto.definirLarguraDOMElement).toBeDefined();  
        
        texto.definirLarguraDOMElement(200);   
        
        expect('200px').toEqual(htmlElement.style.maxWidth);
        expect('200px').toEqual(htmlElement.style.width);
        expect(true).toEqual(notificado);
        
    });
    
    it('Deve definir a altura do domElement e disparar o observer', function(){
        
        notificado = false;
        
        var htmlElement = {
            style: {
                'maxWidth':0,
                'width':0                
            },
            classList: {
                add: function(){}
            }
        }
        
        createjs.DOMElement = function(){ 
            
            var self = this;            
            
            self.htmlElement = htmlElement;
        };
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);       
        
        expect(texto.definirAltura).toBeDefined();        
        expect(false).toEqual(notificado);
        
        texto.definirAltura(200);
        
        expect('200px').toEqual(htmlElement.style.height);
        expect('200px').toEqual(htmlElement.style.maxHeight);
        expect(true).toEqual(notificado);
        
    });
    
    it('Deve modificar o valor da coordenadaX e coordenadaY e notificar o observer', function(){
        
        var text = { x: 0, y: 0 };
        var domElement = { x: 0, y: 0 };
        
        createjs.Text = function(){
            
            var self = this;
            
            Object.defineProperties(self, {                
                
                'x': {
                    get: function(){
                        return text.x;
                    },
                    set: function(value){
                    
                        text.x = value;
                    
                    }
                },
                'y': {
                    get: function(){
                        return text.y;
                    },
                    set: function(value){
                    
                        text.y = value;
                    
                    }
                }
                
            });
            
        };
        
        var htmlElement = {
            style: {
                'maxWidth':0,
                'width':0                
            },
            classList: {
                add: function(){}
            }
        }
        
        createjs.DOMElement = function(){
            
            var self = this;
            
            self.htmlElement = htmlElement;
            
            Object.defineProperties(self, {                
                
                'x': {
                    get: function(){
                        return domElement.x;
                    },
                    set: function(value){                    
                        domElement.x = value;                    
                    }
                },
                'y': {
                    get: function(){
                        return domElement.y;
                    },
                    set: function(value){                    
                        domElement.y = value;                    
                    }
                }
                
            });
            
        };
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);
        
        notificado = false;
        
        texto.coordenadaX = 54;
        
        expect(true).toEqual(notificado);
        expect(54).toEqual(text.x);
        expect(54).toEqual(domElement.x);
        
        notificado = false;
        
        texto.coordenadaY = 64;
        
        expect(true).toEqual(notificado);
        expect(64).toEqual(text.y);
        expect(64).toEqual(domElement.y);
        
    });
    
    it('Ao alterar o valor de visivel, caso seja para "false", deve alterar o valor de edicao e disparar o observer', function(){
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);
        
        notificado = false;
        
        texto.visivel = true;
        
        expect(true).toEqual(notificado);
        expect(true).toEqual(texto.visivel);
        
        notificado = false;
        
        texto.edicao = true;
        
        expect(true).toEqual(texto.edicao);
        
        texto.visivel = false;
        
        expect(false).toEqual(texto.visivel);
        expect(false).toEqual(texto.edicao);
        
    });
    
    it('Ao alterar o valor de edicao deve disparar o observer', function(){
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);
        
        notificado = false;
        
        texto.edicao = true;
        
        expect(true).toEqual(notificado);
        expect(true).toEqual(texto.edicao);
    });
    
    it('Ao alterar o valor do texto deve disparar o observer', function(){
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);
        
        notificado = false;
        
        texto.texto = 'teste';
        
        expect(true).toEqual(notificado);
        expect('teste').toEqual(texto.texto);
    });
    
    it('O change do textarea do DOMElement deve preencher a propriedade text do Text e disparar o observer', function(){
        
        notificado = false;
        
        var htmlElement = document.createElement('textarea');
            
        createjs.DOMElement = function(){
            
            var self = this;
            
            self.htmlElement = htmlElement;
            
        };
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);
        
        expect('').toEqual(texto.texto);        
        
		htmlElement.value = 'teste';
        
        htmlElement.onchange();                

		expect(true).toEqual(notificado);
        expect('teste').toEqual(texto.texto);
        
    });
    
    it('Deve retornar create.Text', function(){
        
        var texto = editimage.fabricaTextoObjeto.criar(observer);
        
        var objetos = texto.retornarCreateObjeto();
        
        expect(2).toEqual(objetos.length);
        
        expect(true).toEqual(objetos[0] instanceof createjs.Text);
        expect(true).toEqual(objetos[1] instanceof createjs.DOMElement);
        
    });
    
});