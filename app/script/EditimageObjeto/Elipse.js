'use strict';

var Elipse = function(observer, shape){

	var self = this;
	EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){

		self.shape.graphics.drawEllipse(50,50,150,100);

	};
};

Elipse.prototype = Object.create(EditimageObjeto.prototype);