'use strict';

editimage.Retangulo = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 8) throw new Error('Informe 8 redimensionadores');
        
	var self = this;
    
	editimage.EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){

		self.shape.graphics.drawRect(50,50,100,100);

	};

};

editimage.Retangulo.prototype = Object.create(editimage.EditimageObjeto.prototype);
