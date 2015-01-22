'use strict';

var EditimageObjeto = function(observer){

	if(!observer || typeof observer.notificar !== 'function') throw new Error("Informe o observer.");

	var self = this;
	var _observer = observer;
	var shape = new createjs.Shape();

	var _selecionado;

	Object.defineProperties(self, {

		'selecionado': {
			get: function(){ return _selecionado; },
			set: function(value){

				if(_selecionado === value) return;

				_selecionado = value;

				_observer.notificar();

			}
		}

	});

	shape.addEventListener('click', function(e){

		self.selecionado = true;

	});

	self.desenhar = function(){



	};

	self.retornarShape = function(){

		return shape;

	};

};