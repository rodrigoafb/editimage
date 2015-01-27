'use strict';

editimage.Linha = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 2) throw new Error('Informe 2 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

	self.desenhar = function(){
                
        self.shape.graphics.setStrokeStyle(2, 'round', 'round')
        self.shape.graphics.beginStroke("red")
        self.shape.graphics.moveTo(50,50)
        self.shape.graphics.lineTo(150, 150);

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
};

editimage.Linha.prototype = Object.create(editimage.EditimageObjeto.prototype);