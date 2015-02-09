'use strict';

editimage.fabricaTextoObjetoBase = {

	criar: function(observer, domElement){
        
        var text = new createjs.Text();
        
		return new editimage.TextoObjeto(text, domElement, observer);

    }
};

editimage.fabricaTextoObjeto = editimage.fabricaTextoObjetoBase;