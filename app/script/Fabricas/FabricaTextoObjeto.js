'use strict';

editimage.fabricaTextoObjeto = {

	criar: function(observer){
        
        var text = new createjs.Text();
                
        var textArea = document.createElement('textarea');
                
        document.body.appendChild(textArea);
        
        var domElement = new createjs.DOMElement(textArea);
        
		return new editimage.TextoObjeto(text, domElement, observer);

	}
};