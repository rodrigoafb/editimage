'use strict';

var editimage = editimage || function(){

	var canvas = {};

	return {

		inicializar: function(idCanvas){

			canvas[idCanvas] = document.getElementById(idCanvas);

		},
		retornarCanvas: function(id){

			return canvas[id];

		}

	}

}();
