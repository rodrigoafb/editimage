'use strict';

editimage.TextoObjeto = function(text, domElement, observer){
    
    if(!text) throw new Error('Informe o Text');
    
    if(!domElement) throw new Error('Informe o DOMElement');
    
    if(!observer) throw new Error('Informe o observer');
    
    var self = this
        ,_text = text
        ,_domElement = domElement
        ,_altura
        ,_largura;
    
    _text.font = '12px Arial';
    _text.color = '#000000';
    _text.lineHeight = 14;
    _text.text = '';
    
    _domElement.htmlElement.style.fontFamily = 'Arial';
    _domElement.htmlElement.style.fontSize = '12px';
    _domElement.htmlElement.style.borderWidth = '1px';
    _domElement.htmlElement.style.borderStyle = 'solid'; 
    _domElement.htmlElement.style.borderColor = 'black';
    _domElement.htmlElement.style.top = 0;
    _domElement.htmlElement.style.left = 0;
    _domElement.htmlElement.classList.add('editimage-textarea')
    
    
    Object.defineProperties(self, {
        'coordenadaX': {
            get: function(){
                
                return _text.x;
                
            },
            set: function(value){ 
                
                _text.x = value;
                _domElement.x = value;     
                
                observer.notificar();
                
            },
            enumerable: true
        },
        'coordenadaY': {
            get: function(){
                
                return _text.y;
                
            },
            set: function(value){
                
                _text.y = value;
                _domElement.y = value;
                
                observer.notificar();
                
            },
            enumerable: true
        },
        'visivel': {
            get: function(){
                
                return _text.visible;
                
            },
            set: function(value){
                
                if(!value) self.edicao = false;
                
                _text.visible = value;
                
                observer.notificar();
                
            },
            enumerable: true
        },
        'edicao': {
            get: function(){
                
                return _domElement.visible;
                
            },
            set: function(value){
                
                _domElement.visible = value;
                
                observer.notificar();
                
            },
            enumerable: true
        },
        'texto': {
            get: function(){
                
                return _text.text;
                
            },
            set: function(value){
                
                _text.text = value;
                            
                observer.notificar();
            },
            enumerable: true
        },
        'altura': {
            get: function(){
                
                return _altura;
                
            },
            enumerable: true
        },
        'largura': {
            get: function(){
                
                return _largura;
                
            },
            enumerable: true
        }
    });
    
    _domElement.htmlElement.onchange = function(){
        
        self.texto = this.value;
        
        observer.notificar();
        
    };
    
    self.definirLarguraText = function(largura){
        
        _text.lineWidth = largura;
        _text.maxWidth = largura;
                
        _largura = largura;
        
        observer.notificar();
    };
    
    self.definirLarguraDOMElement = function(largura){
                
        _domElement.htmlElement.style.width = largura + 'px';
        _domElement.htmlElement.style.maxWidth = largura + 'px';
                
        observer.notificar();
    };
    
    self.definirAltura = function(altura){
                
        _domElement.htmlElement.style.height = altura + 'px';
        _domElement.htmlElement.style.maxHeight = altura + 'px';
        
        _altura = altura;
        
        observer.notificar();
    };
    
    
    
    self.retornarCreateObjeto = function(){
        
        return [_text, _domElement];
        
    };     
    
};