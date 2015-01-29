describe('Observer - ', function(){
   
    it('Deve retornar uma nova instancia do observer', function(){
       
        var observer = editimage.fabricaObserver.criar();
        
        expect(observer).toBeDefined();
        
    });
    
    it('Deve adicionar um callback ao array de callbacks notificar', function(){
        var observer = editimage.fabricaObserver.criar();
        var notificacao; 
        observer.adicionarCallback(function(){
            notificacao = 'Foi notificado';
        });
        
        observer.notificar();
        
        expect('Foi notificado').toEqual(notificacao);
    });
    
});