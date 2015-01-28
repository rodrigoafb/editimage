'use strict';

editimage.Elipse = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 4) throw new Error('Informe 4 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

    var init  = function(){
        
        self.desenhar();
        posicionarRedimensionadores();
        
    };
    
    var posicionarRedimensionadores = function(){
        
        redimensionadores[0].coordenadaX = self.coordenadaX + (self.shape.graphics.command.w / 2) - (redimensionadores[0].largura / 2);
        redimensionadores[0].coordenadaY = self.coordenadaY - (redimensionadores[0].largura / 2);
        
        redimensionadores[1].coordenadaX = self.coordenadaX + self.shape.graphics.command.w - (redimensionadores[0].largura / 2);
        redimensionadores[1].coordenadaY = self.coordenadaY + (self.shape.graphics.command.h / 2) - (redimensionadores[0].largura / 2);
        
        redimensionadores[2].coordenadaX = self.coordenadaX + (self.shape.graphics.command.w / 2) - (redimensionadores[0].largura / 2);
        redimensionadores[2].coordenadaY = self.coordenadaY + self.shape.graphics.command.h - (redimensionadores[0].largura / 2);
        
        redimensionadores[3].coordenadaX = self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[3].coordenadaY = self.coordenadaY + (self.shape.graphics.command.h / 2) - (redimensionadores[0].largura / 2);
        
    };
    
	self.desenhar = function(){

		self.shape.graphics.drawEllipse(50, 50, 150, 100);

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

editimage.Elipse.prototype = Object.create(editimage.EditimageObjeto.prototype);