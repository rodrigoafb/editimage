editimage.fabricaContexto = {
    criar: function(stage){
        var observer  = editimage.fabricaObserver.criar();
        
        return new editimage.Contexto(observer, stage);
    }
};