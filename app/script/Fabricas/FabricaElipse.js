'use strict';

editimage.fabricaElipse = {
	criar: function(observer, shape, redimensionadores){

		return new editimage.Elipse(observer, shape, redimensionadores);

	},
    retornarQuantidadeRedimensionadores: function(){
        return 4;
    }
};