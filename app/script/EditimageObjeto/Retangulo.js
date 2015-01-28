'use strict';

editimage.Retangulo = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 8) throw new Error('Informe 8 redimensionadores');
        
	var self = this;
    
	editimage.EditimageObjeto.call(self, observer, shape);
    
    var init = function(){
        
        self.desenhar();
        posicionarRedimensionadores();
        
    };
    
    var posicionarRedimensionadores = function(){
        
        //Topo esquerda
        redimensionadores[0].coordenadaX = self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[0].coordenadaY = self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
        
        //Topo meio
        redimensionadores[1].coordenadaX = (self.shape.graphics.command.w / 2) + self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[1].coordenadaY = self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
                
        //Topo direita
        redimensionadores[2].coordenadaX = self.shape.graphics.command.w + self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[2].coordenadaY = self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
        
        //Meio esquerda
        redimensionadores[3].coordenadaX = self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[3].coordenadaY = (self.shape.graphics.command.h / 2) + self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
        
        //Meio direita
        redimensionadores[4].coordenadaX = self.shape.graphics.command.w + self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[4].coordenadaY = (self.shape.graphics.command.h / 2) + self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
        
        //Baixo esquerda
        redimensionadores[5].coordenadaX = self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[5].coordenadaY = self.shape.graphics.command.h + self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
        
        //Baixo meio
        redimensionadores[6].coordenadaX = (self.shape.graphics.command.w / 2) + self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[6].coordenadaY = self.shape.graphics.command.h + self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
        
        //Baixo direita
        redimensionadores[7].coordenadaX = self.shape.graphics.command.w + self.shape.graphics.command.x - (redimensionadores[0].largura / 2);
        redimensionadores[7].coordenadaY = self.shape.graphics.command.h + self.shape.graphics.command.y - (redimensionadores[0].largura / 2);
    };    
    
	self.desenhar = function(){

		self.shape.graphics.drawRect(50, 50, 100, 100);

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

editimage.Retangulo.prototype = Object.create(editimage.EditimageObjeto.prototype);
