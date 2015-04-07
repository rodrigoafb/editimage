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
        //removerSelecaoTodosObjetos();
        
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
        
        var objetoCreate = objeto.retornarCreateObjeto();
        
        
        if(Array.isArray(objetoCreate)){
            
            adicionarChildrenStage(objetoCreate);
            
        }else{
            
            adicionarChildStage(objetoCreate);
            
        }
        
        _stage.update();
        
        objetos.push(objeto);
    };
    
    var adicionarChildStage = function(objeto){
        
        _stage.addChild(objeto);
        
    };
    
    var adicionarChildrenStage = function(arrayObjeto){
        
        arrayObjeto.forEach(function(objeto){
            
            _stage.addChild(objeto);
            
        });
        
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
        
        if(_painelFerramentas.adicionarOuSubstituirFerramentas && objeto.retornarFerramentas){ 
            
            var ferramentas = objeto.retornarFerramentas();
            
            _painelFerramentas.adicionarOuSubstituirFerramentas(ferramentas);
        }
        
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
    
    var removerSelecaoTodosObjetos = function(){
        
        var objetosSelecionados = objetos.filter(function (objetoFilter) {
            return objetoFilter.selecionado === true;
        }); 
        
        if(objetosSelecionados) objetosSelecionados.forEach(function(objeto){
            
            objeto.selecionado = false;
            
        });
        
    };
    
    var removerObjetos = function(){
        
        var objetosSelecionados = objetos.filter(function (objetoFilter) {
            return objetoFilter.selecionado === true;
        }); 
        
        redimensionadores = objetosSelecionados[0].retornarRedimensionadores();
        
        var countRedimensionadores = redimensionadores.length;
        
        for (var i = 0; i < countRedimensionadores; i++){
            objetos.splice(objetos.indexOf(redimensionadores[i]), i);
        };
        
        var textoObjeto = objetosSelecionados[0].retornarTextoObjeto();
        var text = textoObjeto.retornarCreateObjeto()[0];
        var domElement = textoObjeto.retornarCreateObjeto()[1];
        
        _stage.removeChild(text);
        domElement.htmlElement.parentNode.removeChild(domElement.htmlElement);
        _stage.removeChild(domElement);
        
        objetos.splice(objetos.indexOf(textoObjeto),1);
        
        objetos.splice(objetos.indexOf(objetosSelecionados[0]),1);
        _stage.removeChild(objetosSelecionados[0].retornarCreateObjeto());

        redimensionadores.forEach(function(redimensionador){
            _stage.removeChild(redimensionador.retornarCreateObjeto());
        });
        
        _painelFerramentas.visivel = false;
        
        _stage.update();
    }
    
    self.retornarStage = function(){
        
        return _stage;
        
    };
    
    self.gerarProjetoJson = function(){
    
        var retornoJson = [];
        var quantidadeObjetos = objetos.length;
        
        for(var i = 0; i < quantidadeObjetos; i++)
        {
            if(objetos[i].retornarPropriedades && typeof objetos[i].retornarPropriedades === 'function') retornoJson.push(objetos[i].retornarPropriedades());
        }
        
        return JSON.stringify(retornoJson);   
    
    };
};



