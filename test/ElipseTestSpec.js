'use strict';

describe('Elipse - ', function(){

	var observer
    , redimensionadores
    , largura
    , altura;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{largura:6},{largura:6},{largura:6},{largura:6}];
        
		editimage.fabricaTextoObjeto = { 
		
			criar: function(){
				return {
                    definirLargura: function(medida){
                        largura = medida;
                    },
                    definirAltura: function(medida){
                        altura = medida;
                    }
                };
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
        
        expect(function(){editimage.fabricaElipse.criar(observer, new createjs.Shape(), [{}])}).toThrow(new Error('Informe 4 redimensionadores'));
        
    });
    
    it('Deve retornar os redimensionadores', function(){
        
        var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores);
        
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

		var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores);

		expect(elipse.retornarShape).toBeDefined();
		expect(elipse.largura).toBeDefined();
		expect(elipse.altura).toBeDefined();
		expect(elipse.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Elipse.prototype instanceof editimage.EditimageObjeto);

	});
    
    it('Quando os valores das propriedade largura e altura alterar, deve disparar o observer', function(){
        
        var elipse = editimage.fabricaElipse.criar(observer, new createjs.Shape(), redimensionadores);
        
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

		var elipse  = editimage.fabricaElipse.criar(observer, shape, redimensionadores);


		elipse.desenhar();

		expect(50).toEqual(elipse.coordenadaX);
		expect(50).toEqual(elipse.coordenadaY);
		expect(150).toEqual(elip.w);
		expect(100).toEqual(elip.h);
	});
    
    it('Deve aplicar e remover a seleção ao elipse', function(){
        
        var shape = new createjs.Shape();
		var evento = {};

		shape.addEventListener = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]();
        };

		var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);

		var shapeElipse = elipse.retornarShape();

		shapeElipse.dispararEvento('click');
        
        expect(true).toEqual(redimensionadores[0].visivel);
        expect(true).toEqual(redimensionadores[1].visivel);
        expect(true).toEqual(redimensionadores[2].visivel);
        expect(true).toEqual(redimensionadores[3].visivel);
        
        elipse.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visivel);
        expect(false).toEqual(redimensionadores[1].visivel);
        expect(false).toEqual(redimensionadores[2].visivel);
        expect(false).toEqual(redimensionadores[3].visivel);
        
        
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
        
        var objeto = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
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
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
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
        
        var shapeElipse = elipse.retornarShape();
        
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
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
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
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);
        
        expect('n-resize').toEqual(redimensionadores[0].cursor);
        expect('e-resize').toEqual(redimensionadores[1].cursor);
        expect('s-resize').toEqual(redimensionadores[2].cursor);
        expect('w-resize').toEqual(redimensionadores[3].cursor);
        
    });
    
    
    it('Deve lançar uma exceção caso o textoObjeto não seja passado', function(){
        expect(function(){new editimage.Elipse(observer, new createjs.Shape(), redimensionadores)}).toThrow(new Error('Informe o textoObjeto'));
    });

    
    it('Deve redimensionar o textoObjeto de acordo com o tamanho da elipse', function(){
       
        var shape = new createjs.Shape(), teste = false;
        
        var elipse = editimage.fabricaElipse.criar(observer, shape, redimensionadores);    
        
        elipse.desenhar();
        
        elipse.redimensionarTextoObjeto();
        
        var textoObjeto = elipse.retornarTextoObjeto();
        
        expect(120).toEqual(largura);
        expect(58.5).toEqual(altura);
        
    });
    
});