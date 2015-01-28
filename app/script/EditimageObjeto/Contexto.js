editimage.Contexto = function(observer, stage){
    
    if (!stage) throw new Error("Informe o stage.");
    
    var _stage = stage, self = this, objetos = [];
    
    _stage.enableMouseOver();
    
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
    
    observer.adicionarCallback(function(){
        _stage.update();
    });   

};



