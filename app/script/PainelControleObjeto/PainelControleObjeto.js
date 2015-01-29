'use strict';
editimage.PainelControle = function (contexto) {
		
	if (!contexto) throw new Error("Informe o contexto.");

	var imagemCriada;

	var _contexto = contexto;

	var self = this;

	var imgOnloadend = function(dataUrl){

		imagemCriada = editimage.fabricaImagem.criar(dataUrl);

		_contexto.Imagem = imagemCriada;

	};

	self.selecionarImagem = function(arquivoImagem){
		var reader = new FileReader();

		reader.onloadend = function () {
			imgOnloadend(reader.result);
		}

		if (arquivoImagem) {
			reader.readAsDataURL(arquivoImagem);
		} 

	};

	self.criarRetangulo = function(){
        
        var observer = _contexto.retornarObserver();
        
        var quantidadeRedimensionadores = editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores();
        
        var redimensionadores = criarRedimensionadores(quantidadeRedimensionadores);

        var shape = new createjs.Shape();  

        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(retangulo);
        retangulo.retornarShape();
	};

	self.criarElipse = function(){
        
        var observer = _contexto.retornarObserver();       
        
        var quantidadeRedimensionadores = editimage.fabricaElipse.retornarQuantidadeRedimensionadores();
        
        var redimensionadores =  criarRedimensionadores(quantidadeRedimensionadores);
        
        var shape = new createjs.Shape();
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(elipse);
        elipse.retornarShape();
	};

	self.criarLinha = function(){

        var observer = _contexto.retornarObserver();
        
        var quantidadeRedimensionadores = editimage.fabricaLinha.retornarQuantidadeRedimensionadores();
        
        var redimensionadores =  criarRedimensionadores(quantidadeRedimensionadores);
        
        var shape = new createjs.Shape();
        
        var linha = editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(linha);
        linha.retornarShape();
	};

	self.retornarContexto = function(){
		return _contexto;
	};
    
    var criarRedimensionadores = function(quantidadeDeRedimensiondadores){
        
        var redimensionadores = [];
        
        for(var i = 0; i < quantidadeDeRedimensiondadores; i++){
            
            redimensionadores.push(editimage.fabricaRedimensionador.criar(new createjs.Shape()));
            _contexto.adicionarObjeto(redimensionadores[i]); 
            
        } 
        
        return redimensionadores;
        
    };

}