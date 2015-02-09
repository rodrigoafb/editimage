'use strict';

describe('Fabrica DOMElement - ', function(){

    it('Para criar um DOMElement é necessário informar o container', function(){
        
        expect(function(){
            editimage.fabricaDOMElement.criar();
            
        }).toThrow(new Error('Informe o container'));
        
    });
    
    it('Deve criar um DOMElement', function(){
        
        var container = document.createElement('div');
        
        var domElement = editimage.fabricaDOMElement.criar(container);
        
        expect(domElement).toBeDefined();
        expect(domElement.htmlElement).toBeDefined();
        
    });

});