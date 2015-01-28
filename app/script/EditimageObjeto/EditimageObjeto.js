'use strict';

editimage.EditimageObjeto = function(observer, shape){

	if(!observer || typeof observer.notificar !== 'function') throw new Error("Informe o observer.");

	if(!shape) throw new Error("Informe o Shape.");

	var self = this,
	    _observer = observer,
	    _selecionado,
	    _memento;

    var coordenadasAuxiliares = {};
    
	var _strokeCommand = shape.graphics.beginStroke("red").command
	   ,_strokeStyleCommand = shape.graphics.setStrokeStyle(0).command;
    
    self.shape = shape;
    
    self.coordenadaX = 0;
    self.coordenadaY = 0;
    
	Object.defineProperties(self, {

		'selecionado': {
			get: function(){ return _selecionado; },
			set: function(value){

				if(_selecionado === value) return;

				_selecionado = value;

				if(_selecionado) {
					criarMemento();
					colocarBordaSelecao();
                    self.aplicarSelecao();
				}else{
					restaurarMemento(_memento);
                    self.removerSelecao();
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
		},
        'coordenadaX': {
            get: function(){
                return self.shape.x;
            },
            set: function(value){
                self.shape.x = value;
                
                observer.notificar(self);
            },
            enumerable: true
        },
        'coordenadaY': {
            get: function(){
                return self.shape.y;
            },
            set: function(value){
                self.shape.y = value;
                
                observer.notificar(self);
            },
            enumerable: true
        }

	});

	shape.addEventListener('click', function(e){

		self.selecionado = true;

	});

    shape.on('mousedown', function(evt){
        
        coordenadasAuxiliares.x = self.coordenadaX - evt.stageX;
        coordenadasAuxiliares.y = self.coordenadaY - evt.stageY;
        
    });
    
    shape.on('pressmove', function(evt){
        
        self.coordenadaX = evt.stageX + coordenadasAuxiliares.x;
        self.coordenadaY = evt.stageY + coordenadasAuxiliares.y;
        
        self.movimentacaoTemplateMethod();
        
    });

    self.movimentacaoTemplateMethod = function(){};
    
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
    
    self.aplicarSelecao = function(){};
    
    self.removerSelecao = function(){};

    
    self.aplicarSelecao = function(){};
    
    self.removerSelecao = function(){};
    
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