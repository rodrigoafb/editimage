'use strict';

editimage.PainelFerramentas = function(){
    
    var self = this;
        
    var _divContainer
       ,_ferramentas
       ,_visivel = true;
    
    Object.defineProperties(self, {
        'visivel': {
            get: function(){
                return _visivel;
            },
            set: function(value){
                
                if(value === _visivel) return;
                
                _visivel = value;
                
                if(_visivel){
                    mostrarPainelFerramentas();
                }else{
                    esconderPainelFerramentas();
                }
            },
            enumerable: true
        }
    });
    
    var init = function(){
        
        _divContainer = criarDivContainerPainelFerramentas();
        
    };
    
    var mostrarPainelFerramentas = function(){
        
        _divContainer.classList.remove('editimage-hidden');
        
    };
    
    var esconderPainelFerramentas = function(){
        
        _divContainer.classList.add('editimage-hidden');
        
    };
    
    self.adicionarOuSubstituirFerramentas = function(ferramentas){
        
        if(_ferramentas) _divContainer.removeChild(_divContainer.firstChild);
        
        _ferramentas = ferramentas;

        _divContainer.appendChild(_ferramentas);
        
    };
    
    self.retornarPainelFerramentas = function(){
        
        return _divContainer;
        
        
    };
    
    var criarDivContainerPainelFerramentas = function(){
        
        var div = document.createElement('div');
        div.classList.add('painel-ferramentas');
        
        return div;
        
    };
    
    init();
    
};