'use strict';

editimage.EditimageObjeto = function(observer, shape){

	if(!observer || typeof observer.notificar !== 'function') throw new Error("Informe o observer.");

	if(!shape) throw new Error("Informe o Shape.");

	var self = this,
	    _observer = observer,
	    _selecionado,
	    _memento;

	var _strokeCommand = shape.graphics.beginStroke("red").command
	   ,_strokeStyleCommand = shape.graphics.setStrokeStyle(0).command;
    
    
    self.shape = shape;
    
	Object.defineProperties(self, {

		'selecionado': {
			get: function(){ return _selecionado; },
			set: function(value){

				if(_selecionado === value) return;

				_selecionado = value;

				if(_selecionado) {
					criarMemento();
					colocarBordaSelecao();
				}else{
					restaurarMemento(_memento);
				}

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


	var colocarBordaSelecao = function(){

		_strokeCommand.style = '#729fe2';
		_strokeStyleCommand.width = 4;

	};

	var criarMemento = function(){

		_memento = JSON.stringify(self);

	};

	var restaurarMemento = function(estado){

		var estado = JSON.parse(estado);

		self.bordaCor = estado.bordaCor;
		self.bordaLargura = estado.bordaLargura;

	};

	self.desenhar = function(){



	};

	self.retornarShape = function(){

		return shape;

	};

	self.retornarEstadoAtual = function(){

		return _memento;

	};

	self.restaurarEstado = function(estado){

		restaurarEstado(estado);

	};

};