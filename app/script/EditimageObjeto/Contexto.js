editimage.Contexto = function(observer, stage, painelFerramentas){
    
    if (!stage) throw new Error("Informe o stage.");
    
    if (!painelFerramentas) throw new Error("Informe o painel de ferramentas.");
    
    var _stage = stage, 
        self = this, 
        objetos = []
        _painelFerramentas = painelFerramentas;
    
    _stage.enableMouseOver(40);
    
    _stage.canvas.addEventListener("click", function(e){
        
        e.target.focus(); 
        
    }, false);
    
    _stage.canvas.addEventListener("keydown", function(e){
        
        if(e.keyCode === 46) removerObjetos();
        
    }, false);
    
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
        
        if(objeto) {
            
            observerDisparadoPorObjetos(objeto);
            
            return;
        }
        
        observerDisparadoPorRedimensionadores();
        
    });   
    
    var observerDisparadoPorObjetos = function(objeto){
        
        removerSelecaoObjetos(objeto);
        
        _painelFerramentas.adicionarOuSubstituirFerramentas(objeto.retornarFerramentas());
        
        _painelFerramentas.visivel = true;
        
        _stage.update();
        
    };
    
    var observerDisparadoPorRedimensionadores = function(){
        
        _stage.update();
        
    };
    
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
        
        redimensionadores = objetosSelecionados[0].retornarRedimensionadores();

        for (var i = 0; i < redimensionadores.length; i++){
            objetos.splice(objetos.indexOf(redimensionadores[i]), i);
        };
        
        objetos.splice(objetos.indexOf(objetosSelecionados[0]),1);
        _stage.removeChild(objetosSelecionados[0].retornarShape());

        redimensionadores.forEach(function(redimensionador){
            _stage.removeChild(redimensionador.retornarShape());
        });
        
        _painelFerramentas.visivel = false;
        
        _stage.update();
    }
};



