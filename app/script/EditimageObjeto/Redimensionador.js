'use strict';

editimage.Redimensionador = function(observer, shape){
    
    if(!observer) throw new Error("Informe o Observer.");
    
    if(!shape) throw new Error("Informe o Shape.");
    
    var self = this;
    var _shape = shape;
    var _observer = observer;
    
    var coordenadasAuxiliares = {};
    
    _shape.graphics.beginFill('blue');
    _shape.graphics.drawRect(0,0,6,6);
    _shape.visible = false;
    
    self.coordenadaX = 0;
    self.coordenadaY = 0;
    
    Object.defineProperties(self, {
        'coordenadaX': {
            get: function(){
                return _shape.x;
            },
            set: function(value){
                _shape.x = value;
                _observer.notificar();
            },
            enumerable: true
        },
        'coordenadaY': {
            get: function(){
                return _shape.y;
            },
            set: function(value){
                _shape.y = value;
                _observer.notificar();
            },
            enumerable: true
        },
        'cursor': {
            get: function(){
                return _shape.cursor;
            },
            set: function(value){
                _shape.cursor = value;
            },
            enumerable: true
        },
        'visivel': {
            get: function(){
                return _shape.visible;
            },
            set: function(value){
                _shape.visible = value;
            },
            enumerable: true
        },
        'largura': {
            get: function(){
                return _shape.graphics.command.w;
            }
        }
    });
    
    _shape.on('mousedown', function(evt){
        
        coordenadasAuxiliares.x = self.coordenadaX - evt.stageX;
        coordenadasAuxiliares.y = self.coordenadaY - evt.stageY;
        
    });
    
    _shape.on('pressmove', function(evt){
        
        self.coordenadaX = evt.stageX + coordenadasAuxiliares.x;
        self.coordenadaY = evt.stageY + coordenadasAuxiliares.y;
        
        self.movimentacaoCallback({coordenadaX: self.coordenadaX, coordenadaY: self.coordenadaY})
        
    });
    
    self.movimentacaoCallback = function(){};
    
    self.retornarCreateObjeto = function(){
        
        return _shape;
        
    };
    
};