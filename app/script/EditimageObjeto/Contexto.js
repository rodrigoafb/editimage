editimage.Contexto = function(observer, stage){
    
    if (!stage) throw new Error("Informe o stage.");
    
    var _stage = stage, self = this, objetos = [], redimensionadores;
    
    _stage.enableMouseOver(40);
    
    _stage.canvas.addEventListener("click", function(e){
        e.target.focus(); 
    }, false);
    
    _stage.canvas.addEventListener("keydown", function(e){
        if(e.keyCode === 46) removerObjetos();
    }, false);
    
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
    
    var removerObjetos = function(){
        
        var objetosSelecionados = objetos.filter(function (objetoFilter) {
            return objetoFilter.selecionado === true;
        }); 
        
        objetos.splice(objetos.indexOf(objetosSelecionados),1);
        
        _stage.removeChild(objetosSelecionados[0].retornarShape());
        
        redimensionadores = objetosSelecionados[0].retornarRedimensionadores();
        
        redimensionadores.forEach(function(redimensionador){
           _stage.removeChild(redimensionador.retornarShape());
        });
        
        _stage.update();
    }
};



