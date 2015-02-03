'use strict';

editimage.PainelFerramentas = function(){
    
    var self = this;
    
    var _divContainer
       ,_ferramentas;
    
    var init = function(){
        
        _divContainer = criarDivContainerPainelFerramentas();
        
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