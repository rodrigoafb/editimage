'use strict';

editimage.fabricaDOMElement = {
  
    criar: function(container){
        
        if(!container) throw new Error('Informe o container');
                
        var textArea = document.createElement('textarea');
                
        container.appendChild(textArea);
        
        return new createjs.DOMElement(textArea);
        
    }
    
};