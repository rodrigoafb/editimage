'use strict';

editimage.fabricaRetanguloBase = {

	criar: function(observer, shape, redimensionadores, textoObjeto){
        
		return new editimage.Retangulo(observer, shape, redimensionadores, textoObjeto);

	},
    retornarQuantidadeRedimensionadores: function(){
        return 8;
    }
};


editimage.fabricaRetangulo = editimage.fabricaRetanguloBase;
