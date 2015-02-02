'use strict';

editimage.Imagem = function(observer, shape, dataUrl){

	var self = this, 
        bitmap;
    
    if(!dataUrl) throw new Error('Informe o dataUrl da imagem.');
    
	editimage.EditimageObjeto.call(self, observer, shape);

    
    var init = function(){
        self.desenhar();    
    };
    
    var calcularRatio = function(largura, altura){
        
        return Math.min((largura / bitmap.image.width), (altura / bitmap.image.height));
        
    };
    
    self.desenhar = function(){
        
        bitmap = new createjs.Bitmap(dataUrl);
        
    };
    
    self.retornarShape = function(){
        return bitmap;
    };
    
    self.escalar = function(largura, altura){
        
        var ratio = 1;
        
        if(largura <= bitmap.image.width || altura <= bitmap.image.height) ratio = calcularRatio(largura, altura);
        
        bitmap.scaleX = ratio;
        bitmap.scaleY = ratio;
        
    };
    
    self.centralizar = function(largura, altura){
        
        var ratio = calcularRatio(largura, altura);
        
        bitmap.x = (largura - (Math.floor(ratio * bitmap.image.width))) / 2;
        bitmap.y = (altura - (Math.floor(ratio * bitmap.image.height))) / 2;
        
    };
    
    init();
    
    
};

editimage.Imagem.prototype = Object.create(editimage.EditimageObjeto.prototype);