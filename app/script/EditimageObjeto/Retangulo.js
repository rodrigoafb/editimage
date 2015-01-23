'use strict';

var Retangulo = function(observer, shape){

	var self = this;
	EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){

		self.shape.graphics.drawRect(50,50,100,100);

	};

};

Retangulo.prototype = Object.create(EditimageObjeto.prototype);