'use strict';

editimage.Elipse = function(observer, shape, redimensionadores){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 4) throw new Error('Informe 4 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);

    Object.defineProperties(self, {
        
        'largura': {
            get: function(){
                return self.shape.graphics.command.w;
            },
            set: function(value){
                
                if(value === self.shape.graphics.command.w) return;
                
                self.shape.graphics.command.w = value;
                
                self.observer.notificar(self);
                
            },
            enumerable: true
        },
        'altura': {
            get: function(){
                return self.shape.graphics.command.h;
            },
            set: function(value){
                
                if(value === self.shape.graphics.command.h) return;
                
                self.shape.graphics.command.h = value;
                
                self.observer.notificar(self);
                
            },
            enumerable: true
        }
        
    });
    
    var init  = function(){
        
        self.desenhar();
        posicionarRedimensionadores();
        atribuirCallbacksNosRedimensionadores();
        
    };
    
    var posicionarRedimensionadores = function(){
        
        redimensionadores[0].coordenadaX = self.coordenadaX + (self.largura / 2) - (redimensionadores[0].largura / 2);
        redimensionadores[0].coordenadaY = self.coordenadaY - (redimensionadores[0].largura / 2);
        
        redimensionadores[1].coordenadaX = self.coordenadaX + self.largura - (redimensionadores[0].largura / 2);
        redimensionadores[1].coordenadaY = self.coordenadaY + (self.altura / 2) - (redimensionadores[0].largura / 2);
        
        redimensionadores[2].coordenadaX = self.coordenadaX + (self.largura / 2) - (redimensionadores[0].largura / 2);
        redimensionadores[2].coordenadaY = self.coordenadaY + self.altura - (redimensionadores[0].largura / 2);
        
        redimensionadores[3].coordenadaX = self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[3].coordenadaY = self.coordenadaY + (self.altura / 2) - (redimensionadores[0].largura / 2);
        
    };
    
    var atribuirCallbacksNosRedimensionadores = function(){
        
        redimensionadores[0].movimentacaoCallback = movimentacaoCimaMeio;
        
        redimensionadores[1].movimentacaoCallback = movimentacaoDireitaMeio;
        
        redimensionadores[2].movimentacaoCallback = movimentacaoBaixoMeio;
        
        redimensionadores[3].movimentacaoCallback = movimentacaoEsquerdaMeio;
        
    };
    
    var movimentacaoCimaMeio = function(coordenada){
        
        self.altura += self.coordenadaY - coordenada.coordenadaY;
        self.coordenadaY = coordenada.coordenadaY;
        
        posicionarRedimensionadores();
        
    };
    
    var movimentacaoDireitaMeio = function(coordenada){
        
        self.largura = coordenada.coordenadaX - self.coordenadaX;
        
        posicionarRedimensionadores();
        
    };
    
    var movimentacaoBaixoMeio = function(coordenada){
        
        self.altura =  coordenada.coordenadaY - self.coordenadaY;
        
        posicionarRedimensionadores();
        
    };
    
    var movimentacaoEsquerdaMeio = function(coordenada){
        
        self.largura += self.coordenadaX - coordenada.coordenadaX;
        self.coordenadaX = coordenada.coordenadaX;
        
        posicionarRedimensionadores();
        
    };
    
	self.desenhar = function(){

		self.shape.graphics.drawEllipse(50, 50, 150, 100);

	};
    
    self.movimentacaoTemplateMethod = function(){
        
        posicionarRedimensionadores();
        
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