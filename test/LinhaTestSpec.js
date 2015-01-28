'use strict';

describe('Linha - ', function(){

	var observer, redimensionadores;

	beforeEach(function(){

		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};

        redimensionadores = [{largura: 6},{largura: 6}];
	});

    it('A fábrica de linhas deve retornar a quantidade de redimensionadores necessários para criar uma linha', function(){
        
        expect(editimage.fabricaLinha.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaLinha.retornarQuantidadeRedimensionadores()).toEqual(2);
        
        
    });
    
    it('Deve lançar uma exceção ao criar uma linha sem os redimensionadores', function(){
       
        expect(function(){editimage.fabricaLinha.criar(observer, new createjs.Shape())}).toThrow(new Error('Informe os redimensionadores'));
        
    });
    
    it('Deve lançar uma exceção ao criar uma linha caso não tenham 2 redimensionadores', function(){
        
        expect(function(){editimage.fabricaLinha.criar(observer, new createjs.Shape(), [{}])}).toThrow(new Error('Informe 2 redimensionadores'));
        
    });
    
	it('Deve criar um objeto Linha', function(){

        var shape = new createjs.Shape();
        
		shape.graphics.setStrokeStyle = function(){
            return { command: {} };
		};
        
        shape.graphics.beginStroke = function(){
            return { command: {} };
		};
        
        shape.graphics.moveTo = function(x,y){
            
            return {
                command: {
                    x: x,
                    y: y
                }
            };
		};
        
        shape.graphics.lineTo = function(x,y){
            
            return {
                command: {
                    x: x,
                    y: y
                }
            };
		};
        
		var linha = editimage.fabricaLinha.criar(observer, shape, redimensionadores);

		expect(linha.retornarShape).toBeDefined();
		expect(true).toEqual(editimage.Linha.prototype instanceof editimage.EditimageObjeto);
        

	});

	it('Deve desenhar uma linha', function(){

		var shape = new createjs.Shape();
		var line = {}, move = {};
        
		shape.graphics.setStrokeStyle = function(){
            return { command: {} };
		};
        
        shape.graphics.beginStroke = function(){
            return { command: {} };
		};
        
        shape.graphics.moveTo = function(x,y){
			move.x = x;
			move.y = y;
            
            return {
                command: {
                    x: x,
                    y: y
                }
            };
		};
        
        shape.graphics.lineTo = function(x,y){
			line.x = x;
			line.y = y;
            
            return {
                command: {
                    x: x,
                    y: y
                }
            };
		};

		var linha  = editimage.fabricaLinha.criar(observer, shape, redimensionadores);


		linha.desenhar();
        
		expect(150).toEqual(line.x);
		expect(150).toEqual(line.y);
        expect(50).toEqual(move.x);
		expect(50).toEqual(move.y);
	});
    
    it('Deve aplicar e remover a seleção da linha', function(){
        
        var shape = new createjs.Shape();
		var evento = {};

		shape.addEventListener = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]();
        };

		var linha = editimage.fabricaLinha.criar(observer, shape, redimensionadores);

		var shapeLinha = linha.retornarShape();

		shapeLinha.dispararEvento('click');
        
        expect(true).toEqual(redimensionadores[0].visible);
        expect(true).toEqual(redimensionadores[1].visible);
        
        linha.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visible);
        expect(false).toEqual(redimensionadores[1].visible);
        
        
    });

    
    it('Deve executar o método movimentacaoTemplateMethod quando o objeto for movido', function(){
        
        var shape = new createjs.Shape();
        var evento = {};
        var movimentou = false;
        
        shape.on = function(e, callback){            
            evento[e] = callback;            
        };
        
        shape.dispararEventoMouseDown = function(){
            evento['mousedown']({stageX: 60, stageY: 60 });
        };
        
        shape.dispararEventoPressMove = function(){
            evento['pressmove']({stageX: 70, stageY: 70 });
        };
        
        var objeto = new editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        objeto.movimen
        
        objeto.coordenadaX = 50;
        objeto.coordenadaY = 50;
        
        var shapeObjeto = objeto.retornarShape();
        
        shapeObjeto.dispararEventoMouseDown();
        shapeObjeto.dispararEventoPressMove();
        
        expect(60).toEqual(objeto.coordenadaX);
        expect(60).toEqual(objeto.coordenadaY);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        
        expect(47).toEqual(redimensionador1.coordenadaX);
        expect(47).toEqual(redimensionador1.coordenadaY);
        
        expect(147).toEqual(redimensionador2.coordenadaX);
        expect(147).toEqual(redimensionador2.coordenadaY);
        
    });
    
    it('Deve posicionar os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.moveTo = function(x,y){
            return {
                command: {
                    x: x,
                    y: y
                }
            };
		};
        
        shape.graphics.lineTo = function(x,y){
            return {
                command: {
                    x: x,
                    y: y
                }
            };
		};
        
        var objeto = new editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        
        expect(47).toEqual(redimensionador1.coordenadaX);
        expect(47).toEqual(redimensionador1.coordenadaY);
        
        expect(147).toEqual(redimensionador2.coordenadaX);
        expect(147).toEqual(redimensionador2.coordenadaY);
        
    });
    
    it('Quando os redimensionadores forem movidos, deve alterar o tamanho da linha', function(){
        
        var shape = new createjs.Shape();
        
        var moveTo = {
                    x: 0,
                    y: 0
                };
        
        var lineTo = {
                    x: 0,
                    y: 0
                };
        
        shape.graphics.moveTo = function(x,y){
            
            moveTo.x = x;
            moveTo.y = y;
            
            return {
                command: moveTo
            };
		};
        
        shape.graphics.lineTo = function(x,y){
            
            lineTo.x = x;
            lineTo.y = y;
            
            return {
                command: lineTo
            };
		};
        
        var objeto = new editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        
        observer.notificado = false;
        
        redimensionador1.movimentacaoCallback({coordenadaX: 50, coordenadaY: 50});
        redimensionador2.movimentacaoCallback({coordenadaX: 100, coordenadaY: 100});
        
        expect(50).toEqual(moveTo.x);
        expect(50).toEqual(moveTo.y);
        
        expect(100).toEqual(lineTo.x);
        expect(100).toEqual(lineTo.y);
        
        expect(true).toEqual(observer.notificado);
        
    })
    
});