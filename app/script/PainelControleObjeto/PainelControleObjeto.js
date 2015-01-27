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
			imgOnloaded(reader.result);
		}

		if (arquivoImagem) {
			reader.readAsDataURL(arquivoImagem);
		} 

	};

	self.criarRetangulo = function(){
        
        var observer = _contexto.retornarObserver();
        var shape = new createjs.Shape();        
        
        var quantidadeRedimensionadores = editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores();
        var redimensionadores =  editimage.fabricaRedimensionador.criar(quantidadeRedimensionadores);       
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(retangulo);
	};

	self.criarElipse = function(){
        
        var observer = _contexto.retornarObserver();
        var shape = new createjs.Shape();       
        
        var quantidadeRedimensionadores = editimage.fabricaElipse.retornarQuantidadeRedimensionadores();
        var redimensionadores =  editimage.fabricaRedimensionador.criar(quantidadeRedimensionadores);
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(elipse);
	};

	self.criarLinha = function(){

        var observer = _contexto.retornarObserver();
        var shape = new createjs.Shape();
        
        var quantidadeRedimensionadores = editimage.fabricaLinha.retornarQuantidadeRedimensionadores();
        var redimensionadores =  editimage.fabricaRedimensionador.criar(quantidadeRedimensionadores);
        
        var linha = editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
		_contexto.adicionarObjeto(linha);

	};

	self.retornarContexto = function(){
		return _contexto;
	};

}