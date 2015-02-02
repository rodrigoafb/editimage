editimage.Contexto = function(observer, stage){
    
    if (!stage) throw new Error("Informe o stage.");
    
    var _stage = stage, self = this, objetos = [];
    
    _stage.enableMouseOver(40);
    
    
    Object.defineProperties(self, {
        'largura': {
            get: function(){
                return _stage.canvas.width;
            },
            set: function(value){
                _stage.canvas.height = value;
            },
            enumerable: true
        },
        'altura': {
            get: function(){
                return _stage.canvas.height;
            },
            set: function(value){
                _stage.canvas.height = value;
            },
            enumerable: true
        }
    });
    
    self.adicionarObjeto = function(objeto){
        
        _stage.addChild(objeto.retornarShape());
        _stage.update();
        
        objetos.push(objeto);
    };
    
    self.retornarObjetos = function(){
        return objetos;
    };
    
    self.retornarObserver = function(){
        return observer; 
    };
    
    observer.adicionarCallback(function(objeto){
        
        if(objeto) removerSelecaoObjetos(objeto)
        
        _stage.update();
    });   
    
    var removerSelecaoObjetos = function(objeto){
        
        var objetosNaoSelecionados = objetos.filter(function (objetoFilter) {
            return objetoFilter !== objeto;
        });
        
        objetosNaoSelecionados.forEach(function(item){
            
            item.selecionado = false;
            
        });
        
    };
    
};



