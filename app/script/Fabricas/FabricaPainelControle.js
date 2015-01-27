'use strict';

editimage.fabricaPainelControleBase = {
	criar: function (contexto) {

			return new editimage.PainelControle(contexto);

		}
};

editimage.fabricaPainelControle = Object.create(editimage.fabricaPainelControleBase);

