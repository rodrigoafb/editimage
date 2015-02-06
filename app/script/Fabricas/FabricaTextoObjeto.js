'use strict';

editimage.fabricaTextoObjetoBase = {

	criar: function(observer){
        
        var text = new createjs.Text();
                
        var textArea = document.createElement('textarea');
                
        document.querySelectorAll('.editimage > .container')[0].appendChild(textArea);
        
        var domElement = new createjs.DOMElement(textArea);
        
		return new editimage.TextoObjeto(text, domElement, observer);

    }
};

editimage.fabricaTextoObjeto = editimage.fabricaTextoObjetoBase;