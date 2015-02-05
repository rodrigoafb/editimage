'use strict';

describe('PainelFerramentas - ', function(){
    
    var observer = {};
    
    it('Deve criar um PainelFerramentas', function(){
        
        var painel = editimage.fabricaPainelFerramentas.criar();
        
        expect(painel.adicionarOuSubstituirFerramentas).toBeDefined();
        expect(painel.retornarPainelFerramentas).toBeDefined();
        expect(true).toEqual(painel.visivel);
        
        
    });
    
    it('Deve retornar o painel de ferramentas', function(){
        
        var painel = editimage.fabricaPainelFerramentas.criar();
        
        var htmlPainel = painel.retornarPainelFerramentas();
        
        var div = document.createElement('div');
        div.appendChild(htmlPainel);
        
        var htmlExpect = '<div class="painel-ferramentas"></div>';
        
        expect(htmlExpect).toEqual(div.innerHTML);
        
    });
    
    it('Deve adicionar ferramentas', function(){
        
        var painel = editimage.fabricaPainelFerramentas.criar();
        
        var divFerramentas = document.createElement('div');
        divFerramentas.innerHTML = '<button type="button" class="botao botao-texto"><span class="icon icon-texto"></span></button>';
        
        painel.adicionarOuSubstituirFerramentas(divFerramentas);
        
        var htmlPainel = painel.retornarPainelFerramentas();
        
        var div = document.createElement('div');
        div.appendChild(htmlPainel);
        
        var htmlExpect = '<div class="painel-ferramentas"><div><button type="button" class="botao botao-texto"><span class="icon icon-texto"></span></button></div></div>';
        
        expect(htmlExpect).toEqual(div.innerHTML);
        
    });
    
    it('Deve substituir as ferramentas do painel de ferramentas', function(){
        
        var painel = editimage.fabricaPainelFerramentas.criar();
        
        var divFerramentas = document.createElement('div');
        divFerramentas.innerHTML = '<button type="button" class="botao botao-texto"><span class="icon icon-texto"></span></button>';
        
        painel.adicionarOuSubstituirFerramentas(divFerramentas);
        
        var htmlPainel = painel.retornarPainelFerramentas();
        
        var div = document.createElement('div');
        div.appendChild(htmlPainel);
        
        var htmlExpect = '<div class="painel-ferramentas"><div><button type="button" class="botao botao-texto"><span class="icon icon-texto"></span></button></div></div>';
        
        expect(htmlExpect).toEqual(div.innerHTML);
        
        var divNovaFerramentas = document.createElement('div');
        divNovaFerramentas.innerHTML = '<span></span><i></i>';
        
        painel.adicionarOuSubstituirFerramentas(divNovaFerramentas);
        
        htmlPainel = painel.retornarPainelFerramentas();
        
        var divNovaFerramentas = document.createElement('div');
        divNovaFerramentas.appendChild(htmlPainel);
        
        htmlExpect = '<div class="painel-ferramentas"><div><span></span><i></i></div></div>';
        
        expect(htmlExpect).toEqual(divNovaFerramentas.innerHTML);
        
    });
    
    it('Deve mostrar ou esconder o painel de ferramentas', function(){
        
        
        var painel = editimage.fabricaPainelFerramentas.criar();
        
        var htmlPainel = painel.retornarPainelFerramentas();
        
        var div = document.createElement('div');
        div.appendChild(htmlPainel);
        
        var htmlExpect = '<div class="painel-ferramentas"></div>';
        
        expect(htmlExpect).toEqual(div.innerHTML);
        
        painel.visivel = false;
        
        htmlExpect = '<div class="painel-ferramentas editimage-hidden"></div>';
        
        expect(htmlExpect).toEqual(div.innerHTML);
        
        painel.visivel = true;
        
        htmlExpect = '<div class="painel-ferramentas"></div>';
        
        expect(htmlExpect).toEqual(div.innerHTML);
        
    });
    
});