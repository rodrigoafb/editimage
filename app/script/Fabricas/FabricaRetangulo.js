'use strict';

editimage.fabricaRetanguloBase = {
	criar: function(observer, shape){

		return new editimage.Retangulo(observer, shape);

	}
};


editimage.fabricaRetangulo = editimage.fabricaRetanguloBase;