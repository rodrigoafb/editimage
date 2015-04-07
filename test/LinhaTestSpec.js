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
    
    it('Deve retornar os redimensionadores', function(){
        
        var linha = editimage.fabricaLinha.criar(observer, new createjs.Shape(), redimensionadores);
        
        var redimensionadoresRetornados = linha.retornarRedimensionadores();
        
        expect(true).toEqual(redimensionadoresRetornados === redimensionadores);
    });
    
	it('Deve criar um objeto Linha', function(){

        var shape = new createjs.Shape();
        
        shape.removeAllEventListeners = function(evento){
            
            shape.evenstosRemovidos = shape.evenstosRemovidos || [];
            shape.evenstosRemovidos.push(evento);
            
        };
        
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

		expect(linha.retornarCreateObjeto).toBeDefined();
        expect('pointer').toEqual(linha.cursor);
		expect(true).toEqual(editimage.Linha.prototype instanceof editimage.EditimageObjeto);
        expect(1).toEqual(shape.evenstosRemovidos.length);
        expect('pressmove').toEqual(shape.evenstosRemovidos[0]);

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

		shape.on = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]({stageX: 0, stageY: 0});
        };

		var linha = editimage.fabricaLinha.criar(observer, shape, redimensionadores);

		var shapeLinha = linha.retornarCreateObjeto();

		shapeLinha.dispararEvento('mousedown');
        
        expect(true).toEqual(redimensionadores[0].visivel);
        expect(true).toEqual(redimensionadores[1].visivel);        
        
        linha.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visivel);
        expect(false).toEqual(redimensionadores[1].visivel);
        
        
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
        
        var objeto = editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
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
        
        var objeto = editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        var redimensionador1 = redimensionadores[0];
        var redimensionador2 = redimensionadores[1];
        
        observer.notificado = false;
        redimensionador1.movimentacaoCallback({coordenadaX: 50, coordenadaY: 50});
        expect(50).toEqual(moveTo.x);
        expect(50).toEqual(moveTo.y);
        
        expect(true).toEqual(observer.notificado);
        
        observer.notificado = false;
        redimensionador2.movimentacaoCallback({coordenadaX: 100, coordenadaY: 100});
        expect(100).toEqual(lineTo.x);
        expect(100).toEqual(lineTo.y);
        
        expect(true).toEqual(observer.notificado);
        
    });
    
    it('A linha deve setar cursor move para os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        var objeto = editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        expect('move').toEqual(redimensionadores[0].cursor);
        expect('move').toEqual(redimensionadores[1].cursor);
        
    });
    
    it('Deve retornar o html das ferramentas', function(){
        
        var shape = new createjs.Shape();
        
        var objeto = new editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        var htmlFerramentas = objeto.retornarFerramentas();
        
        expect(htmlFerramentas).toBeDefined();
        
        var divPainel = document.createElement('div');
		divPainel.classList.add('painel');               
        
        divPainel.appendChild(htmlFerramentas);
                  
        
        var expectativa = [];
		expectativa.push('<div class="ferramentas">');
		expectativa.push('</div>');
        
        
        expect(expectativa.join('')).toEqual(divPainel.innerHTML);
        
    });
    
    it('Deve retornar um objeto com as propriedades publicas da Linha', function(){
        
        var shape = new createjs.Shape();
        var linha = new editimage.fabricaLinha.criar(observer, shape, redimensionadores);
        
        linha.selecionado = true;
        linha.bordaCor = '#fff';
        linha.bordaLargura = 100;
        linha.coordenadaX = 10;
        linha.coordenadaY = 55;  
        
        linha.desenhar();
        
        var propriedadesLinha = linha.retornarPropriedades();
        
        var linhaRetornoExpect = {
            entidade: 'Linha',
            estado: {
                selecionado: true,
                bordaCor: '#fff',
                bordaLargura: 100,
                coordenadaX: 10,
                coordenadaY: 55,
                moveTo: {
                    x: 50,
                    y: 50
                },
                lineTo: {
                    x:150,
                    y:150                
                }        
            }        
        };
       
        
        var propriedadesLinhaJson = JSON.stringify(propriedadesLinha);
        
        var linhaRetornoExpectJson = JSON.stringify(linhaRetornoExpect);
        
        expect(propriedadesLinhaJson).toEqual(linhaRetornoExpectJson);
               
    });
    
});