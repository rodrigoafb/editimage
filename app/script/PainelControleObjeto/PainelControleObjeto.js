'use strict';
editimage.PainelControle = function (contexto) {
		
	if (!contexto) throw new Error("Informe o contexto.");

	var _contexto = contexto;

	var self = this;

	self.selecionarImagem = function(arquivoImagem){
		var reader = new FileReader();

		reader.onloadend = function () {
			carregamentoTerminado(reader.result);
		}

		if (arquivoImagem) {
			reader.readAsDataURL(arquivoImagem);
		} 
	};
    
    var carregamentoTerminado = function(dataUrl){
        
        var shape = new createjs.Shape();
        var observer = _contexto.retornarObserver();
        
		var imagem = editimage.fabricaImagem.criar(observer, shape, dataUrl);
        
        imagem.escalar(_contexto.largura, _contexto.altura);
        
        imagem.centralizar(_contexto.largura, _contexto.altura);
        
		_contexto.adicionarObjeto(imagem);

	};

	self.criarRetangulo = function(){
        
        var observer = _contexto.retornarObserver();
        
        var quantidadeRedimensionadores = editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores();
        
        var redimensionadores = criarRedimensionadores(quantidadeRedimensionadores);

        var shape = new createjs.Shape();  
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(retangulo);
        
        var textoObjeto = retangulo.retornarTextoObjeto();
        
        _contexto.adicionarObjeto(textoObjeto);
        
        redimensionadores.forEach(function(redimensionador){
            _contexto.adicionarObjeto(redimensionador);
        });
        
        retangulo.retornarCreateObjeto();
	};

	self.criarElipse = function(){
        
        var observer = _contexto.retornarObserver();       
        
        var quantidadeRedimensionadores = editimage.fabricaElipse.retornarQuantidadeRedimensionadores();
        
        var redimensionadores =  criarRedimensionadores(quantidadeRedimensionadores);
        
        var shape = new createjs.Shape();
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(elipse);
        
        var textoObjeto = elipse.retornarTextoObjeto();
        
        _contexto.adicionarObjeto(textoObjeto);
        
        redimensionadores.forEach(function(redimensionador){
            _contexto.adicionarObjeto(redimensionador);
        });
        
        elipse.retornarCreateObjeto();
	};

	self.criarLinha = function(){

        var observer = _contexto.retornarObserver();
        
        var quantidadeRedimensionadores = editimage.fabricaLinha.retornarQuantidadeRedimensionadores();
        
        var redimensionadores =  criarRedimensionadores(quantidadeRedimensionadores);
        
        var shape = new createjs.Shape();
        
        var linha = editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(linha);
        
        redimensionadores.forEach(function(redimensionador){
            _contexto.adicionarObjeto(redimensionador);
        });
        
        linha.retornarCreateObjeto();
	};

	self.retornarContexto = function(){
		return _contexto;
	};
    
    var criarRedimensionadores = function(quantidadeDeRedimensiondadores){
        
        var redimensionadores = [];
        
        for(var i = 0; i < quantidadeDeRedimensiondadores; i++){
            
            redimensionadores.push(editimage.fabricaRedimensionador.criar(_contexto.retornarObserver(), new createjs.Shape()));
            
        } 
        
        return redimensionadores;
        
    };

}