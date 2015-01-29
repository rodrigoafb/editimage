'use strict';

editimage.Linha = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 2) throw new Error('Informe 2 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

    var moveTo,
        lineTo;
    
    var init = function(){
        
        self.desenhar();
        posicionarRedimensionadores();
        atribuirCallbacksNosRedimensionadores();
        
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
    
    var movimentacaoMoveTo = function(coordenada){
        
        moveTo.x = coordenada.coordenadaX;
        moveTo.y = coordenada.coordenadaY;
        
        self.observer.notificar(self);
        
    };
    
    var movimentacaoLineTo = function(coordenadas){
        
        lineTo.x = coordenadas.coordenadaX;
        lineTo.y = coordenadas.coordenadaY;
        
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
            
            redimensionadores[i].visible = true;
            
        }
        
    };
    
    self.removerSelecao = function(){
        
        var countRedimensionadores = redimensionadores.length;
        
        for(var i = 0; i< countRedimensionadores; i++){
            
            redimensionadores[i].visible = false;
            
        }
        
    };
    
    init();
    
};

editimage.Linha.prototype = Object.create(editimage.EditimageObjeto.prototype);