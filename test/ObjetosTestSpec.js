'use strict';

var createjs,
	observer;

describe('Objetos - ', function () {
	

	beforeEach(function(){

		createjs = {

			Shape: function(){

				var self = this;
				var evento = {};

				self.graphics = {
					beginStroke: function(){

					}
				};

				self.addEventListener = function(pEvento, callback){

					evento[pEvento] = callback;

				}

				self.dispararEvento = function(pEvento){

					evento[pEvento]();

				};

			}

		};

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

	});

	it('Deve criar um EditimageObjeto', function(){

		var objeto = new EditimageObjeto(observer);

		expect(objeto.desenhar).toBeDefined();
		expect('function').toEqual(typeof objeto.desenhar);

	});

	it('Deve retornar o Shape', function(){

		var objeto = new EditimageObjeto(observer);

		var shape = objeto.retornarShape();

		expect(shape.graphics).toBeDefined();

	});

	it('Quando clicar em um elemento no canvas de ficar selecionado', function(){

		var objeto = new EditimageObjeto(observer);

		var shape = objeto.retornarShape();

		shape.dispararEvento('click');

		expect(true).toEqual(objeto.selecionado);

	});

	it('Quando o valor da propriedade selecionado for alterado deve disparar o observer', function(){

		observer.notificado = false;

		var objeto = new EditimageObjeto(observer);

		objeto.selecionado = true;

		expect(true).toEqual(observer.notificado);

	});

	it('Deve estourar um exceção ao criar um objeto sem observer', function(){


		try{

			new EditimageObjeto(observer);

		}catch(ex){

			expect(ex.message).toEqual('Informe o observer.');

		}

	});

	it('Quando a propriedade selecionado for true, deve criar uma bordar azul', function(){

		var objeto = new EditimageObjeto(observer);

		objeto.selecionado = true;



	});

});
