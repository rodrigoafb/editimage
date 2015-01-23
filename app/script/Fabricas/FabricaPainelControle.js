'use strict';

editimage.fabricaPainelControleBase = {
	criar: function (contexto) {

			return new PainelControle(contexto);

		}
};

editimage.fabricaPainelControle = Object.create(editimage.fabricaPainelControleBase);

