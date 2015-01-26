'use strict';

editimage.fabricaImagemBase = {
	criar: function(observer, shape){

		return new editimage.Imagem(observer, shape);

	}
};

editimage.fabricaImagem = editimage.fabricaImagemBase;