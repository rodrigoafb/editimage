'use strict';

describe('Elipse - ', function(){

	var observer
    , redimensionadores
    , largura
    , altura
    , textoObjeto = {};

	beforeEach(function(){
        
        textoObjeto = {
                    definirLarguraText: function(medida){
                        textoObjeto.largura = medida;
                    },
                    definirLarguraDOMElement: function(largura){
                        textoObjeto.larguraDOMElement = largura;
                    },
                    definirAltura: function(medida){
                        textoObjeto.altura = medida;
                    }
                };
        
		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{largura:6},{largura:6},{largura:6},{largura:6}];
        
		editimage.fabricaTextoObjeto = { 
		
			criar: function(){
				return textoObjeto;
			}

		};
	});
    
    it('A fábrica de elipses deve retornar a quantidade de redimensionadores necessários para criar uma elipse', function(){
        
        expect(editimage.fabricaElipse.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaElipse.retornarQuantidadeRedimensionadores()).toEqual(4);
        
        
    });
    
    it('Deve lançar uma exceção ao criar uma elipse sem os redimensionadores', function(){
       
        expect(function(){editimage.fabricaElipse.criar(observer, new createjs.Shape())}).toThrow(new Error('Informe os redimensionadores'));
        
    });
    
    it('Deve lançar uma exceção ao criar uma elipse caso não tenham 4 redimensionadores', function(){
        
        expect(function(){editimage.fabricaElipse.criar(observer, new createjs.Shape(), [{}], textoObjeto)}).toThrow(new Error('Informe 4 redimensionadores'));
        
    });
    
    it('Deve retornar os redimensionadores', function(){
        
        var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores, textoObjeto);
        
        var redimensionadoresRetornados = elipse.retornarRedimensionadores();
        
        expect(true).toEqual(redimensionadoresRetornados === redimensionadores);
    });
    
	it('Deve criar um objeto Elipse', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawRect = function(x,y,w,h){
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};

		var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores, textoObjeto);

		expect(elipse.retornarCreateObjeto).toBeDefined();
		expect(elipse.largura).toBeDefined();
		expect(elipse.altura).toBeDefined();
		expect(elipse.retornarCreateObjeto).toBeDefined();
		expect(false).toEqual(textoObjeto.visivel);
		expect(true).toEqual(editimage.Elipse.prototype instanceof editimage.EditimageObjeto);

	});
    
    it('Quando os valores das propriedade largura e altura alterar, deve disparar o observer', function(){
        
        var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores, textoObjeto);
        
        observer.notificado = false;
        elipse.largura = 78;
        expect(true).toEqual(observer.notificado);

        observer.notificado = false;
        elipse.altura = 78;
        expect(true).toEqual(observer.notificado);
        
    });

	it('Deve desenhar um elipse', function(){

		var shape = new createjs.Shape();
		var elip = {};

		shape.graphics.drawEllipse = function(x,y,w,h){
			elip.x = x;
			elip.y = y;
			elip.w = w;
			elip.h = h;

		};

		var elipse  = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);


		elipse.desenhar();

		expect(50).toEqual(elipse.coordenadaX);
		expect(50).toEqual(elipse.coordenadaY);
		expect(150).toEqual(elip.w);
		expect(100).toEqual(elip.h);
	});
    
    it('Deve aplicar e remover a seleção ao elipse', function(){
        
        var shape = new createjs.Shape();
		var evento = {};

		shape.on = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]({stageX: 0, stageY: 0});
        };

		var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);

		var shapeElipse = elipse.retornarCreateObjeto();

		shapeElipse.dispararEvento('mousedown');
        
        expect(true).toEqual(redimensionadores[0].visivel);
        expect(true).toEqual(redimensionadores[1].visivel);
        expect(true).toEqual(redimensionadores[2].visivel);
        expect(true).toEqual(redimensionadores[3].visivel);
        
        textoObjeto.edicao = true;
        elipse.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visivel);
        expect(false).toEqual(redimensionadores[1].visivel);
        expect(false).toEqual(redimensionadores[2].visivel);
        expect(false).toEqual(redimensionadores[3].visivel);
        expect(false).toEqual(textoObjeto.edicao);
        
    });
    
    it('Deve posicionar os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawEllipse = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        var objeto = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        var redimensionador3 = redimensionadores[2];
        var redimensionador4 = redimensionadores[3];
        
        expect(122).toEqual(redimensionador1.coordenadaX);
        expect(47).toEqual(redimensionador1.coordenadaY);
        
        expect(197).toEqual(redimensionador2.coordenadaX);
        expect(97).toEqual(redimensionador2.coordenadaY);
        
        expect(122).toEqual(redimensionador3.coordenadaX);
        expect(147).toEqual(redimensionador3.coordenadaY);
        
        expect(47).toEqual(redimensionador4.coordenadaX);
        expect(97).toEqual(redimensionador4.coordenadaY);
        
    });
    
    it('Quando a elipse for movida, deve reposicionar os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        var evento = {};
        
        shape.graphics.drawEllipse = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        shape.on = function(e, callback){            
            evento[e] = callback;            
        };
        
        shape.dispararEventoMouseDown = function(){
            evento['mousedown']({stageX: 60, stageY: 60 });
        };
        
        shape.dispararEventoPressMove = function(){
            evento['pressmove']({stageX: 70, stageY: 70 });
        };
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        var redimensionador3 = redimensionadores[2];
        var redimensionador4 = redimensionadores[3];
        
        expect(122).toEqual(redimensionador1.coordenadaX);
        expect(47).toEqual(redimensionador1.coordenadaY);
        
        expect(197).toEqual(redimensionador2.coordenadaX);
        expect(97).toEqual(redimensionador2.coordenadaY);
        
        expect(122).toEqual(redimensionador3.coordenadaX);
        expect(147).toEqual(redimensionador3.coordenadaY);
        
        expect(47).toEqual(redimensionador4.coordenadaX);
        expect(97).toEqual(redimensionador4.coordenadaY);       
        
        var shapeElipse = elipse.retornarCreateObjeto();
        
        shapeElipse.dispararEventoMouseDown();
        shapeElipse.dispararEventoPressMove();        
        
        expect(132).toEqual(redimensionador1.coordenadaX);
        expect(57).toEqual(redimensionador1.coordenadaY);
        
        expect(207).toEqual(redimensionador2.coordenadaX);
        expect(107).toEqual(redimensionador2.coordenadaY);
        
        expect(132).toEqual(redimensionador3.coordenadaX);
        expect(157).toEqual(redimensionador3.coordenadaY);
        
        expect(57).toEqual(redimensionador4.coordenadaX);
        expect(107).toEqual(redimensionador4.coordenadaY); 
        
    });
    
    it('Quando os redimensionadores forem movidos, deve modificar as dimensões da elipse', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawEllipse = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        var redimensionador3 = redimensionadores[2];
        var redimensionador4 = redimensionadores[3];
        
        //Meio cima
        redimensionador1.movimentacaoCallback({coordenadaX: 122 , coordenadaY: 37});
        expect(50).toEqual(elipse.coordenadaX);
        expect(150).toEqual(shape.graphics.command.w);
        expect(113).toEqual(shape.graphics.command.h);
        expect(37).toEqual(elipse.coordenadaY);
        expect(122).toEqual(redimensionador1.coordenadaX);
        expect(34).toEqual(redimensionador1.coordenadaY);
        
        //Meio direita
        redimensionador2.movimentacaoCallback({coordenadaX: 207 , coordenadaY: 97});
        expect(50).toEqual(elipse.coordenadaX);
        expect(157).toEqual(shape.graphics.command.w);
        expect(113).toEqual(shape.graphics.command.h);
        expect(37).toEqual(elipse.coordenadaY);
        expect(204).toEqual(redimensionador2.coordenadaX);
        expect(90.5).toEqual(redimensionador2.coordenadaY);
        
        //Meio baixo
        redimensionador3.movimentacaoCallback({coordenadaX: 122 , coordenadaY: 157});
        expect(50).toEqual(elipse.coordenadaX);
        expect(157).toEqual(shape.graphics.command.w);
        expect(120).toEqual(shape.graphics.command.h);
        expect(37).toEqual(elipse.coordenadaY);
        expect(125.5).toEqual(redimensionador3.coordenadaX);
        expect(154).toEqual(redimensionador3.coordenadaY);
        
        //Meio baixo
        redimensionador4.movimentacaoCallback({coordenadaX: 37 , coordenadaY: 97});
        expect(37).toEqual(elipse.coordenadaX);
        expect(170).toEqual(shape.graphics.command.w);
        expect(120).toEqual(shape.graphics.command.h);
        expect(37).toEqual(elipse.coordenadaY);
        expect(34).toEqual(redimensionador4.coordenadaX);
        expect(94).toEqual(redimensionador4.coordenadaY);
        
    });
    
    it('Deve definir um cursor para cada redimensionador da elipse', function(){
        
        var shape = new createjs.Shape();
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        expect('n-resize').toEqual(redimensionadores[0].cursor);
        expect('e-resize').toEqual(redimensionadores[1].cursor);
        expect('s-resize').toEqual(redimensionadores[2].cursor);
        expect('w-resize').toEqual(redimensionadores[3].cursor);
        
    });
    
    it('Deve lançar uma exceção caso o textoObjeto não seja passado', function(){
        expect(function(){new editimage.Elipse(observer, new createjs.Shape(), redimensionadores)}).toThrow(new Error('Informe o textoObjeto'));
    });

    it('Deve redimensionar o textoObjeto de acordo com o tamanho da elipse', function(){
       
        var shape = new createjs.Shape();
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);    
        
        elipse.desenhar();
        
        elipse.largura = 400;
        elipse.altura = 200;
        
        elipse.redimensionarTextoObjeto();
        
        expect(320).toEqual(textoObjeto.largura);
        expect(113).toEqual(textoObjeto.altura);
        
    });
    
    it('Quando redimensionar a elipse deve redimensionar o TextoObjeto', function(){
        var shape = new createjs.Shape();
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        textoObjeto.largura = 0;
        textoObjeto.altura = 0;
        
        elipse.coordenadaX = 100;
        elipse.coordenadaY = 100;
        
        elipse.largura = 400;
        expect(320).toEqual(textoObjeto.largura);
        expect(140).toEqual(textoObjeto.coordenadaX);
        
        elipse.altura = 200;
        expect(113).toEqual(textoObjeto.altura);
        expect(141).toEqual(textoObjeto.coordenadaY);
        
    });
    
    it('Quando o elipse for movido, deve reposicionar o TextObjeto', function(){
        var shape = new createjs.Shape();
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        textoObjeto.coordenadaX = 0;
        textoObjeto.coordenadaY = 0;
        
        elipse.coordenadaX = 100;
        elipse.coordenadaY = 100;
        elipse.largura = 400;
        elipse.altura = 200;
        
        elipse.movimentacaoTemplateMethod();
        
        expect(140).toEqual(textoObjeto.coordenadaX);
        expect(141).toEqual(textoObjeto.coordenadaY);
        
    });
    
    it('Quando criar no botão Texto no painel de ferramentas, deve mostrar a caixa o TextoObjeto', function(){
        
        var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores, textoObjeto);
        
        var ferramentas = elipse.retornarFerramentas();
        
        var botao = ferramentas.querySelectorAll('button')[0];
        
        textoObjeto.coordenadaX = 0;
        textoObjeto.coordenadaY = 0;
        textoObjeto.largura = 0;
        textoObjeto.altura = 0;
        
        elipse.coordenadaX = 100;
        elipse.coordenadaY = 100;
        elipse.largura = 400;
        elipse.altura = 200;
        
        botao.onclick();
        
        expect(true).toEqual(textoObjeto.visivel);
        expect(true).toEqual(textoObjeto.edicao);
        
        expect(140).toEqual(textoObjeto.coordenadaX);
        expect(141).toEqual(textoObjeto.coordenadaY);
        expect(320).toEqual(textoObjeto.largura);
        expect(113).toEqual(textoObjeto.altura);
        
    });
    
    it('No doubleclick da elipse, deve habilitar a edição do texto se o TextoObjeto estiver visivel', function(){
        
        var shape = new createjs.Shape();
		var evento = {};
        
        textoObjeto.edicao = false;
        
		shape.addEventListener = function(pEvento, callback){

					evento[pEvento] = callback;

				};

		shape.dispararEvento = function(pEvento){

					evento[pEvento]();

				};

		var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);

		var shape = elipse.retornarCreateObjeto();
        
        textoObjeto.visivel = true;
        
		shape.dispararEvento('dblclick');

		expect(true).toEqual(textoObjeto.edicao);
        
    });
    
    it('Deve retornar um objeto com as propriedades publicas do Elipse', function() {
    
        var shape = new createjs.Shape();

		var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores, textoObjeto);
        
        elipse.selecionado = true;
        elipse.bordaCor = '#fff';
        elipse.bordaLargura = 100;
        elipse.coordenadaX = 10;
        elipse.coordenadaY = 55;
        
        elipse.altura = 10;
        elipse.largura = 10;
        
        var propriedadesElipse = elipse.retornarPropriedades();
        
        expect(propriedadesElipse).toBeDefined();
        
        
        var elipseRetornoExpect = {
            entidade: 'Elipse',
            estado: {
                selecionado: true,
                bordaCor: '#fff',
                bordaLargura: 100,
                coordenadaX: 10,
                coordenadaY: 55,
                altura: 10,
                largura: 10   
            }
            
        };
        
        var elipseJson = JSON.stringify(elipse);
        
        var propriedadesElipseJson = JSON.stringify(propriedadesElipse);
        
        var elipseRetornoExpectJson = JSON.stringify(elipseRetornoExpect);
        
        expect(propriedadesElipseJson).not.toEqual(elipseJson);
        expect(propriedadesElipseJson).toEqual(elipseRetornoExpectJson);
    
    });
    
});