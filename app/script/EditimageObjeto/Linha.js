'use strict';


editimage.Linha = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 2) throw new Error('Informe 2 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

    self.shape.removeAllEventListeners('mousedown');
    self.shape.removeAllEventListeners('pressmove');
    self.cursor = 'pointer';
    
    var moveTo,
        lineTo;
    
    var init = function(){
        
        self.desenhar();
        posicionarRedimensionadores();
        atribuirCallbacksNosRedimensionadores();
        definirCursorRedimensionadores();
        
    };
    
    var posicionarRedimensionadores = function(){
        
        redimensionadores[0].coordenadaX = moveTo.x - (redimensionadores[0].largura / 2);
        redimensionadores[0].coordenadaY = moveTo.y - (redimensionadores[0].largura / 2);
        
        redimensionadores[1].coordenadaX = lineTo.x - (redimensionadores[1].largura / 2);
        redimensionadores[1].coordenadaY = lineTo.y - (redimensionadores[1].largura / 2);
        
    };
    
    var atribuirCallbacksNosRedimensionadores = function(){
        
        redimensionadores[0].movimentacaoCallback = movimentacaoMoveTo;
        
        redimensionadores[1].movimentacaoCallback = movimentacaoLineTo;
        
    };
    
    var definirCursorRedimensionadores = function(){
        
        redimensionadores[0].cursor = 'move';
        
        redimensionadores[1].cursor = 'move';
        
    };
    
    var movimentacaoMoveTo = function(coordenada){
        
        moveTo.x = coordenada.coordenadaX;
        moveTo.y = coordenada.coordenadaY;  
        
        posicionarRedimensionadores();
        
        self.observer.notificar(self);
        
    };
    
    var movimentacaoLineTo = function(coordenada){
        
        lineTo.x = coordenada.coordenadaX;
        lineTo.y = coordenada.coordenadaY;
        
        posicionarRedimensionadores();
        
        self.observer.notificar(self);
        
    };
    
    self.movimentacaoTemplateMethod =function(){
        
        posicionarRedimensionadores();
        
    };
    
    self.desenhar = function(){
                
        self.shape.graphics.setStrokeStyle(2, 'round', 'round');
        self.shape.graphics.beginStroke("red");
        moveTo = self.shape.graphics.moveTo(50,50).command;
        lineTo = self.shape.graphics.lineTo(150, 150).command;

	};
    
    self.aplicarSelecao = function(){
        
        var countRedimensionadores = redimensionadores.length;
        
        for(var i = 0; i< countRedimensionadores; i++){
            
            redimensionadores[i].visivel = true;
            
        }
        
    };
    
    self.removerSelecao = function(){
        
        var countRedimensionadores = redimensionadores.length;
        
        for(var i = 0; i< countRedimensionadores; i++){
            
            redimensionadores[i].visivel = false;
            
        }
        
    };
    
    self.retornarRedimensionadores = function(){
        
        return redimensionadores;
        
    };
    
    self.retornarFerramentas = function(){
        
        return criarElementoDivFerramentas();
        
    };
    
    var criarElementoDivFerramentas = function(){
        
        var divFerramentas = document.createElement('div');
        divFerramentas.setAttribute('class', 'ferramentas');
        
        var botaoRemover = criarBotaoRemover();
        
        divFerramentas.appendChild(botaoRemover);
        
        return divFerramentas;
        
    };
    
    var criarBotaoRemover = function(){
		
		var botaoRemover = document.createElement('button');

		botaoRemover.setAttribute('type', 'button');
		botaoRemover.setAttribute('class', 'botao botao-remover');

		var icone = criarIconeBotao('remover');

		botaoRemover.appendChild(icone);

		return botaoRemover;

	};
    
    var criarIconeBotao = function(nomeIcone){

		var spanIcone = document.createElement('span');
		spanIcone.setAttribute('class', 'icon icon-'+ nomeIcone);

		return spanIcone;

	};
    
    init();
    
};

editimage.Linha.prototype = Object.create(editimage.EditimageObjeto.prototype);