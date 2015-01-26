'use strict';

editimage.Elipse = function(observer, shape){

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){

		self.shape.graphics.drawEllipse(50, 50, 150, 100);

	};
};

editimage.Elipse.prototype = Object.create(editimage.EditimageObjeto.prototype);