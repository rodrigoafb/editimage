'use strict';

editimage.fabricaElipse = {
	criar: function(observer, shape, redimensionadores){
        
        var textoObjeto = editimage.fabricaTextoObjeto.criar(observer);
		return new editimage.Elipse(observer, shape, redimensionadores, textoObjeto);

	},
    retornarQuantidadeRedimensionadores: function(){
        return 4;
    }
};