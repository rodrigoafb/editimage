'use strict';

editimage.Imagem = function(observer, shape, dataUrl){

	var self = this, bitmap;
    
    if(!dataUrl) throw new Error('Informe o dataUrl da imagem.');
    
	editimage.EditimageObjeto.call(self, observer, shape);

    
    var init = function(){
        self.desenhar();    
    };
    
    self.desenhar = function(){
        
        bitmap = new createjs.Bitmap(dataUrl);
        
    };
    
    self.retornarShape = function(){
        return bitmap;
    };
    
    
    init();
    
    
};

editimage.Imagem.prototype = Object.create(editimage.EditimageObjeto.prototype);