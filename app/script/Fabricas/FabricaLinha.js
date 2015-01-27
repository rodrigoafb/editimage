'use strict';

editimage.fabricaLinha = {
	criar: function(observer, shape, redimensionadores){

		return new editimage.Linha(observer, shape, redimensionadores);

	},
    retornarQuantidadeRedimensionadores: function(){
        return 2;
    }
};