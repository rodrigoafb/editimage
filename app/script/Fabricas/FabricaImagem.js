'use strict';

editimage.fabricaImagemBase = {
	criar: function(observer, shape, dataUrl){
        
		return new editimage.Imagem(observer, shape, dataUrl);

	}
};

editimage.fabricaImagem = editimage.fabricaImagemBase;