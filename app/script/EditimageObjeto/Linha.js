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
        
    };
    
    var posicionarRedimensionadores = function(){
        
        redimensionadores[0].coordenadaX = moveTo.x - (redimensionadores[0].largura / 2);
        redimensionadores[0].coordenadaY = moveTo.y - (redimensionadores[0].largura / 2);
        
        redimensionadores[1].coordenadaX = lineTo.x - (redimensionadores[1].largura / 2);
        redimensionadores[1].coordenadaY = lineTo.y - (redimensionadores[1].largura / 2);
        
    };
    
    self.desenhar = function(){
                
        self.shape.graphics.setStrokeStyle(2, 'round', 'round');
        self.shape.graphics.beginStroke("red");
        moveTo = self.shape.graphics.moveTo(50,50).command;
        lineTo = self.shape.graphics.lineTo(150, 150).command;

	};
    
    init();
};

editimage.Linha.prototype = Object.create(editimage.EditimageObjeto.prototype);