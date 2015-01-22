'use strict';

var EditimageObjeto = function(observer, shape){

	if(!observer || typeof observer.notificar !== 'function') throw new Error("Informe o observer.");

	if(!shape) throw new Error("Informe o Shape.");

	var self = this,
	    _observer = observer,
	    _shape = shape,
	    _selecionado;

	var _strokeCommand = shape.graphics.beginStroke("red").command
	   ,_strokeStyleCommand = shape.graphics.setStrokeStyle(0).command;


	Object.defineProperties(self, {

		'selecionado': {
			get: function(){ return _selecionado; },
			set: function(value){

				if(_selecionado === value) return;

				_selecionado = value;

				if(_selecionado) colocarBorda();

				_observer.notificar(self);

			}
		},

		'bordaCor': {
			get: function(){ return _strokeCommand.style; },
			set: function(value){

				if(_strokeCommand.style === value) return;

				_strokeCommand.style = value;
			},
			enumerable: true
		},
		'bordaLargura': {
			get: function(){ return _strokeStyleCommand.width; },
			set: function(value){

				if(_strokeStyleCommand.width === value) return;

				_strokeStyleCommand.width = value;
			},
			enumerable: true
		}

	});

	shape.addEventListener('click', function(e){

		self.selecionado = true;

	});


	var colocarBorda = function(){

		_strokeCommand.style = '#729fe2';
		_strokeStyleCommand.width = 4;

	};

	self.desenhar = function(){



	};

	self.retornarShape = function(){

		return shape;

	};

	self.retornarEstadoAtual = function(){

		return JSON.stringify(self);

	};

	self.restaurarEstado = function(estado){

		var estado = JSON.parse(estado);

		self.bordaCor = estado.bordaCor;
		self.bordaLargura = estado.bordaLargura;

	};

};