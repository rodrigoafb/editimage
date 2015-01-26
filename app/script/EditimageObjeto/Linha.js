'use strict';

editimage.Linha = function(observer, shape){

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){
                
        self.shape.graphics.setStrokeStyle(2, 'round', 'round')
        self.shape.graphics.beginStroke("red")
        self.shape.graphics.moveTo(50,50)
        self.shape.graphics.lineTo(150, 150);

	};
};

editimage.Linha.prototype = Object.create(editimage.EditimageObjeto.prototype);