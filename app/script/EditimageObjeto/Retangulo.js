'use strict';

editimage.Retangulo = function(observer, shape, redimensionadores, textoObjeto){

    if(!redimensionadores) throw new Error('Informe os redimensionadores');
    
    if(redimensionadores.length !== 8) throw new Error('Informe 8 redimensionadores');
    
    if(!textoObjeto) throw new Error('Informe o TextoObjeto');
        
	var self = this;
    
    var _textoObjeto = textoObjeto;
    _textoObjeto.visivel = false;
    
	editimage.EditimageObjeto.call(self, observer, shape);
    
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
                
                observer.notificar(self);
                
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
                
                observer.notificar(self);
                
            },
            enumerable: true
        }
        
    });
    
    var init = function(){
        
        self.desenhar();
        self.coordenadaX = 50;
        self.coordenadaY = 50;
        posicionarRedimensionadores();
        atribuirCallbacksNosRedimensionadores();
        definirCursosRedimensionadores();
        
    };
    
    var posicionarRedimensionadores = function(){
        
        //Topo esquerda
        redimensionadores[0].coordenadaX = self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[0].coordenadaY = self.coordenadaY - (redimensionadores[0].largura / 2);
        
        //Topo meio
        redimensionadores[1].coordenadaX = (self.largura / 2) + self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[1].coordenadaY = self.coordenadaY - (redimensionadores[0].largura / 2);
                
        //Topo direita
        redimensionadores[2].coordenadaX = self.largura + self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[2].coordenadaY = self.coordenadaY - (redimensionadores[0].largura / 2);
        
        //Meio esquerda
        redimensionadores[3].coordenadaX = self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[3].coordenadaY = (self.altura / 2) + self.coordenadaY - (redimensionadores[0].largura / 2);
        
        //Meio direita
        redimensionadores[4].coordenadaX = self.largura + self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[4].coordenadaY = (self.altura / 2) + self.coordenadaY - (redimensionadores[0].largura / 2);
        
        //Baixo esquerda
        redimensionadores[5].coordenadaX = self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[5].coordenadaY = self.altura + self.coordenadaY - (redimensionadores[0].largura / 2);
        
        //Baixo meio
        redimensionadores[6].coordenadaX = (self.largura / 2) + self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[6].coordenadaY = self.altura + self.coordenadaY - (redimensionadores[0].largura / 2);
        
        //Baixo direita
        redimensionadores[7].coordenadaX = self.largura + self.coordenadaX - (redimensionadores[0].largura / 2);
        redimensionadores[7].coordenadaY = self.altura + self.coordenadaY - (redimensionadores[0].largura / 2);
    };    
    
    var atribuirCallbacksNosRedimensionadores = function(){
        
        redimensionadores[0].movimentacaoCallback = movimentacaoCimaEsquerda;
        
        redimensionadores[1].movimentacaoCallback = movimentacaoCimaMeio;
        
        redimensionadores[2].movimentacaoCallback = movimentacaoCimaDireita;
        
        redimensionadores[3].movimentacaoCallback = movimentacaoEsquerdaMeio;
        
        redimensionadores[4].movimentacaoCallback = movimentacaoDireitaMeio;
        
        redimensionadores[5].movimentacaoCallback = movimentacaoBaixoEsquerda;
        
        redimensionadores[6].movimentacaoCallback = movimentacaoBaixoMeio;
        
        redimensionadores[7].movimentacaoCallback = movimentacaoBaixoDireita;
    };
    
    var movimentacaoCimaEsquerda = function(coordenada){
                
        self.largura +=  self.coordenadaX - coordenada.coordenadaX;
        self.altura +=  self.coordenadaY - coordenada.coordenadaY;
        
        self.coordenadaX = coordenada.coordenadaX;
        self.coordenadaY = coordenada.coordenadaY;
        
        posicionarRedimensionadores();
    };
    
    var movimentacaoCimaMeio = function(coordenada){
        
        self.altura += self.coordenadaY - coordenada.coordenadaY;
        self.coordenadaY = coordenada.coordenadaY;
        
        posicionarRedimensionadores();
        
    };
    
    var movimentacaoCimaDireita = function(coordenada){
                
        self.largura = coordenada.coordenadaX - self.coordenadaX;
        self.altura += self.coordenadaY - coordenada.coordenadaY;
        
        self.coordenadaY = coordenada.coordenadaY;
        
        posicionarRedimensionadores();
    };
    
    var movimentacaoDireitaMeio = function(coordenada){
        
        self.largura = coordenada.coordenadaX - self.coordenadaX;
        
        posicionarRedimensionadores();
        
    };   
    
    var movimentacaoEsquerdaMeio = function(coordenada){
        
        self.largura += self.coordenadaX - coordenada.coordenadaX;
        self.coordenadaX = coordenada.coordenadaX;
        
        posicionarRedimensionadores();
        
    };
    
    var movimentacaoBaixoEsquerda = function(coordenada){
                
        self.largura +=  self.coordenadaX - coordenada.coordenadaX;
        self.altura = coordenada.coordenadaY - self.coordenadaY;
        
        self.coordenadaX = coordenada.coordenadaX;
        
        posicionarRedimensionadores();
    };
    
    var movimentacaoBaixoMeio = function(coordenada){
        
        self.altura =  coordenada.coordenadaY - self.coordenadaY;
        
        posicionarRedimensionadores();
        
    };
    
    var movimentacaoBaixoDireita = function(coordenada){
                
        self.largura = coordenada.coordenadaX - self.coordenadaX;
        self.altura = coordenada.coordenadaY - self.coordenadaY;
                
        posicionarRedimensionadores();
    };
    
    var definirCursosRedimensionadores = function(){
        
        redimensionadores[0].cursor = 'nw-resize';
        redimensionadores[1].cursor = 'n-resize';
        redimensionadores[2].cursor = 'ne-resize';
        redimensionadores[3].cursor = 'w-resize';
        redimensionadores[4].cursor = 'e-resize';
        redimensionadores[5].cursor = 'sw-resize';
        redimensionadores[6].cursor = 's-resize';
        redimensionadores[7].cursor = 'se-resize';
    };
    
    self.shape.addEventListener('dblclick', function(){
        
        if(_textoObjeto.visivel) _textoObjeto.edicao = true;
        
    });
    
	self.desenhar = function(){

		self.shape.graphics.drawRect(0, 0, 100, 100);

	};
    
    self.movimentacaoTemplateMethod = function(){
        
        posicionarRedimensionadores();
        self.posicionarTextoObjeto();
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
        
        _textoObjeto.edicao = false;
        
    };
    
    self.retornarRedimensionadores = function(){
        
        return redimensionadores;
        
    };
    
    self.posicionarTextoObjeto = function(){
        
        _textoObjeto.coordenadaX = self.coordenadaX + 1;
        _textoObjeto.coordenadaY = self.coordenadaY + 1;
        
    };
    
    self.redimensionarTextoObjeto = function(){
        
        _textoObjeto.definirLarguraText(self.largura - 13);
        _textoObjeto.definirLarguraDOMElement(self.largura - 8);
        _textoObjeto.definirAltura(self.altura - 8);
        
    };
    
    self.retornarTextoObjeto = function(){
        
        return _textoObjeto;
        
    };
    
    self.onclickBotaoTextoTemplateMethod = function(event){
        
        _textoObjeto.visivel = true;
        _textoObjeto.edicao = true;
        
        self.posicionarTextoObjeto();
        self.redimensionarTextoObjeto();
        
    };

    self.retornarPropriedades = function(){
    
        return{
            entidade: 'Retangulo',
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

editimage.Retangulo.prototype = Object.create(editimage.EditimageObjeto.prototype);
