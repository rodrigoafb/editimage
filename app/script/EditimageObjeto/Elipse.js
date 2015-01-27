'use strict';

editimage.Elipse = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 4) throw new Error('Informe 4 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){

		self.shape.graphics.drawEllipse(50, 50, 150, 100);

	};
};

editimage.Elipse.prototype = Object.create(editimage.EditimageObjeto.prototype);