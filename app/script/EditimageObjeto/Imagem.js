'use strict';

editimage.Imagem = function(observer, shape){

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);
    
    self.desenhar = function(){
        
        self.shape.graphics.drawEllipse(50,50,100,100);
    
    };
    
};

editimage.Imagem.prototype = Object.create(editimage.EditimageObjeto.prototype);