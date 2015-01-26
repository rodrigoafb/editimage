'use strict';

editimage.Retangulo = function(observer, shape){

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){

		self.shape.graphics.drawRect(50,50,100,100);

	};

};

editimage.Retangulo.prototype = Object.create(editimage.EditimageObjeto.prototype);