
var PainelControle = function (contexto) {
		
	if(!contexto) throw new Error("Informe o contexto.");

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

		_contexto.Retangulo = editimage.fabricaRetangulo.criar();
	};

	self.criarElipse = function(){

	};

	self.criarLinha = function(){

	};

	self.retornarContexto = function(){
		return _contexto;
	};

}