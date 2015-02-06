'use strict';

editimage.EditimageObjeto = function(observer, shape){

	if(!observer || typeof observer.notificar !== 'function') throw new Error("Informe o observer.");

	if(!shape) throw new Error("Informe o Shape.");

	var self = this,
	    _selecionado,
	    _memento;
    
    self.shape = shape;
    self.shape.offset = {};
    self.shape.graphics.beginFill('#fff');
	var _strokeCommand = self.shape.graphics.beginStroke("red").command
	   ,_strokeStyleCommand = shape.graphics.setStrokeStyle(2).command;
    
    self.shape.cursor = 'move';
    self.observer = observer;
    
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

				self.observer.notificar(self);

			},
            enumerable: true
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
                
                self.observer.notificar(self);
            },
            enumerable: true
        },
        'coordenadaY': {
            get: function(){
                return self.shape.y;
            },
            set: function(value){
                self.shape.y = value;
                
                self.observer.notificar(self);
            },
            enumerable: true
        },
        'cursor': {
            get: function(){
                return self.shape.cursor;
            },
            set: function(value){
                
                self.shape.cursor = value;
                
            }
        }

	});

	shape.addEventListener('click', function(e){

		self.selecionado = true;

	});

    shape.on('mousedown', function(evt){
        
        self.shape.offset.x = self.coordenadaX - evt.stageX;
        self.shape.offset.y = self.coordenadaY - evt.stageY;
        self.selecionado = true;
        
    });
    
    shape.on('pressmove', function(evt){
        
        self.coordenadaX = evt.stageX + self.shape.offset.x;
        self.coordenadaY = evt.stageY + self.shape.offset.y;
        
        self.movimentacaoTemplateMethod();
        
        self.selecionado = true;
        
    });

    self.movimentacaoTemplateMethod = function(){};
    
	var colocarBordaSelecao = function(){

		_strokeCommand.style = '#729fe2';

	};

	var criarMemento = function(){

        var objeto = {
            bordaCor: self.bordaCor,
            bordaLargura: self.bordaLargura,
            coordenadaX: self.coordenadaX,
            coordenadaY: self.coordenadaY
            
        };
        
        _memento = JSON.stringify(objeto);
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
    
	self.retornarCreateObjeto = function(){

		return shape;

	};
    
	self.retornarEstadoAtual = function(){

		return _memento;

	};

	self.restaurarEstado = function(estado){

		restaurarEstado(estado);

	};
    
    self.retornarFerramentas = function(){
        
        return criarElementoDivFerramentas();        
        
    };
    
    var criarElementoDivFerramentas = function(){
        
        var divFerramentas = document.createElement('div');
        divFerramentas.setAttribute('class', 'ferramentas');
        
        var botaoTexto = criarBotaoTexto();
        
        divFerramentas.appendChild(botaoTexto);
        
        return divFerramentas;
        
    };
    
    var criarBotaoTexto = function(){
		
		var botaoTexto = document.createElement('button');

		botaoTexto.setAttribute('type', 'button');
		botaoTexto.setAttribute('class', 'botao botao-texto');
        
        botaoTexto.onclick = self.onclickBotaoTextoTemplateMethod;
        
		var icone = criarIconeBotao('texto');

		botaoTexto.appendChild(icone);

		return botaoTexto;

	};
    
    self.onchangeBotaoTextoTemplateMethod = function(){
        
        
        
    };
    
    var criarIconeBotao = function(nomeIcone){

		var spanIcone = document.createElement('span');
		spanIcone.setAttribute('class', 'icon icon-'+ nomeIcone);

		return spanIcone;

	};

};