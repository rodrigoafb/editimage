
var PainelControle = function (contexto) {
		
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
			reader.readAsDataURL(arquivoImagem);asdsada
		} 

	};

	self.criarRetangulo = function(){
        
        var shape = new createjs.Shape();
        var observer = _contexto.retornarObserver();
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape);
        
		_contexto.adicionarObjeto(retangulo);
	};

	self.criarElipse = function(){

		_contexto.adicionarObjeto(editimage.fabricaElipse.criar(_contexto.retornarObserver(), new createjs.Shape()))
	};

	self.criarLinha = function(){

		_contexto.adicionarObjeto(editimage.fabricaLinha.criar(_contexto.retornarObserver(), new createjs.Shape()))

	};

	self.retornarContexto = function(){
		return _contexto;
	};

}