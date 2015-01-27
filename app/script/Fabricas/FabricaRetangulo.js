'use strict';

editimage.fabricaRetanguloBase = {
	criar: function(observer, shape, redimensionadores){

		return new editimage.Retangulo(observer, shape, redimensionadores);

	},
    retornarQuantidadeRedimensionadores: function(){
        return 8;
    }
};


editimage.fabricaRetangulo = editimage.fabricaRetanguloBase;
