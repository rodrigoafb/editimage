'use strict';

editimage.fabricaElipse = {
	criar: function(observer, shape, redimensionadores, textoObjeto){
        
		return new editimage.Elipse(observer, shape, redimensionadores, textoObjeto);

	},
    retornarQuantidadeRedimensionadores: function(){
        return 4;
    }
};