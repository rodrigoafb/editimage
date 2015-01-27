'use strict';

var createjs,
	observer;

describe('Objetos - ', function () {
	

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

		editimage.fabricaPainelControle = Object.create(editimage.fabricaPainelControleBase);

	});

	it('Deve criar um editimage.EditimageObjeto', function(){

		var objeto = new editimage.EditimageObjeto(observer, new createjs.Shape());

		expect(objeto.desenhar).toBeDefined();
		expect('function').toEqual(typeof objeto.desenhar);

	});

	it('Deve retornar o Shape', function(){

		var objeto = new editimage.EditimageObjeto(observer, new createjs.Shape());

		var shape = objeto.retornarShape();

		expect(shape.graphics).toBeDefined();

	});

	it('Quando um objeto for clicado ficar selecionado', function(){

		var shape = new createjs.Shape();
		var evento = {};

		shape.addEventListener = function(pEvento, callback){

					evento[pEvento] = callback;

				};

		shape.dispararEvento = function(pEvento){

					evento[pEvento]();

				};

		var objeto = new editimage.EditimageObjeto(observer, shape);

		var shape = objeto.retornarShape();

		shape.dispararEvento('click');

		expect(true).toEqual(objeto.selecionado);

	});

	it('Quando o valor da propriedade selecionado for alterado deve disparar o observer', function(){

		observer.notificado = false;

		var objeto = new editimage.EditimageObjeto(observer, new createjs.Shape());

		objeto.selecionado = true;

		expect(true).toEqual(observer.notificado);

	});

	it('Deve estourar um exceção ao criar um objeto sem observer', function(){


		expect(function(){new editimage.EditimageObjeto()}).toThrow(new Error('Informe o observer.'));

	});

	it('Deve estourar um exceção ao criar um objeto sem o shape', function(){


		expect(function(){new editimage.EditimageObjeto(observer)}).toThrow(new Error('Informe o Shape.'));

	});

	it('Quando a propriedade selecionado for true, deve criar uma bordar azul', function(){

		var shape = new createjs.Shape();
		var strokeCommand = {
					style: ''
				},
			strokeStyleCommand = {
				width: 0
			};

		shape.graphics.beginStroke = function(){
			return {
				command: strokeCommand
			};
		};

		shape.graphics.setStrokeStyle = function(){
			return {
				command: strokeStyleCommand
			};
		};

		var objeto = new editimage.EditimageObjeto(observer, shape);

		objeto.selecionado = true;

		expect('#729fe2').toEqual(strokeCommand.style);
		expect(4).toEqual(strokeStyleCommand.width);

	});

	it('Quando a propriedade selecionado for false, deve retornar o objeto ao estado anterior', function(){

		var shape = new createjs.Shape();
		var strokeCommand = {
					style: ''
				},
			strokeStyleCommand = {
				width: 0
			};

		shape.graphics.beginStroke = function(cor){

			strokeCommand.style = cor;

			return {
				command: strokeCommand
			};
		};

		shape.graphics.setStrokeStyle = function(width){

			strokeStyleCommand.width = width;

			return {
				command: strokeStyleCommand
			};
		};

		var observer2 = {
			notificar: function(){}
		};

		var objeto = new editimage.EditimageObjeto(observer2, shape);

		objeto.selecionado = true;
		objeto.selecionado = false;

		expect('red').toEqual(strokeCommand.style);
		expect(0).toEqual(strokeStyleCommand.width);

	});
    
    it('Deve mover o objeto', function(){
        
       var shape = new createjs.Shape();
        var evento = {}
           ,coordenadaX = 0
           ,coordenadaY = 0;
        
        shape.on = function(e, callback){            
            evento[e] = callback;            
        };
        
        shape.dispararEventoMouseDown = function(){
            evento['mousedown']({stageX: 60, stageY: 60 });
        };
        
        shape.dispararEventoPressMove = function(){
            evento['pressmove']({stageX: 70, stageY: 70 });
        };
        
        var objeto = new editimage.EditimageObjeto(observer, shape);
        
        objeto.movimentacaoCallback = function(evt){            
            coordenadaX = evt.coordenadaX;
            coordenadaY = evt.coordenadaY;
        };
        
        objeto.coordenadaX = 50;
        objeto.coordenadaY = 50;
        
        var shapeObjeto = objeto.retornarShape();
        
        shapeObjeto.dispararEventoMouseDown();
        shapeObjeto.dispararEventoPressMove();
        
        expect(60).toEqual(objeto.coordenadaX);
        expect(60).toEqual(objeto.coordenadaY);
        
        expect(60).toEqual(coordenadaX);
        expect(60).toEqual(coordenadaY);  
    
    });

});
