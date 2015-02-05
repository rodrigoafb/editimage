editimage.fabricaContexto = {
    criar: function(stage, painelFerramentas){
        var observer  = editimage.fabricaObserver.criar();
        
        return new editimage.Contexto(observer, stage, painelFerramentas);
    }
};