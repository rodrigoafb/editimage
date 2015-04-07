'use strict';

editimage.Elipse = function(observer, shape, redimensionadores, textoObjeto){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(!textoObjeto) throw new Error('Informe o textoObjeto');
    
    if(redimensionadores.length !== 4) throw new Error('Informe 4 redimensionadores');

	var self = this;
	editimage.EditimageObjeto.call(self, observer, shape);
    
    textoObjeto.visivel = false;
    
    Object.defineProperties(self, {
        
        'largura': {
            get: function(){
                return self.shape.graphics.command.w;
            },
            set: function(value){
                
                if(value === self.shape.graphics.command.w) return;
                
                self.shape.graphics.command.w = value;
                
                self.redimensionarTextoObjeto();
                
                self.posicionarTextoObjeto();
                
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
                
                self.redimensionarTextoObjeto();
                
                self.posicionarTextoObjeto();
                
                self.observer.notificar(self);
                
            },
            enumerable: true
        }
        
    });
    
    var init  = function(){
        
        self.desenhar();
        self.coordenadaX = 50;
        self.coordenadaY = 50;
        posicionarRedimensionadores();
        atribuirCallbacksNosRedimensionadores();
        definirCursorRedimensionadores();
        
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
    
    var definirCursorRedimensionadores = function(){
        
        redimensionadores[0].cursor = 'n-resize';
        
        redimensionadores[1].cursor = 'e-resize';
        
        redimensionadores[2].cursor = 's-resize';
        
        redimensionadores[3].cursor = 'w-resize';
        
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
    
    self.shape.addEventListener('dblclick', function(){
        
        if(textoObjeto.visivel) textoObjeto.edicao = true;
        
    });
    
	self.desenhar = function(){
        
		self.shape.graphics.drawEllipse(0, 0, 150, 100);

	};
    
    self.movimentacaoTemplateMethod = function(){
        
        posicionarRedimensionadores();
        self.posicionarTextoObjeto();
    };
    
    self.posicionarTextoObjeto = function(){
        
        textoObjeto.coordenadaX = Math.floor(self.coordenadaX + ((self.largura - textoObjeto.largura) / 2));
        textoObjeto.coordenadaY = Math.floor(self.coordenadaY + ((self.altura - (textoObjeto.altura + 4)) / 2));
        
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
        
        textoObjeto.edicao = false;
        
    };
    
    self.retornarRedimensionadores = function(){
        
        return redimensionadores;
        
    };
    
    self.redimensionarTextoObjeto = function(){
        
        textoObjeto.definirLarguraText(self.largura * 0.8);
        textoObjeto.definirLarguraDOMElement((self.largura * 0.8) - 4);        
        textoObjeto.definirAltura((self.altura * 0.585) - 4);
    };
    
    self.retornarTextoObjeto = function(){
        return textoObjeto;
    }
    
    self.onclickBotaoTextoTemplateMethod = function(event){
        
        textoObjeto.visivel = true;
        textoObjeto.edicao = true;
        
        self.redimensionarTextoObjeto();
        self.posicionarTextoObjeto();
        
    };
    
    self.retornarPropriedades = function(){
        
        return{
            entidade: 'Elipse',
            estado:{
                selecionado: self.selecionado,
                bordaCor: self.bordaCor,
                bordaLargura: self.bordaLargura,
                coordenadaX: self.coordenadaX,
                coordenadaY: self.coordenadaY,
                altura: self.altura,
                largura: self.largura
            }
        
        };    
    
    };
    
    init();
    
    
};

editimage.Elipse.prototype = Object.create(editimage.EditimageObjeto.prototype);

