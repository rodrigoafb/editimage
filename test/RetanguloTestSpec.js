'use strict';

describe('Retangulo - ', function() {

	var observer, 
        redimensionadores,
        textoObjeto = {};

	beforeEach(function(){
        
        editimage.fabricaTextoObjeto = {
            criar: function(){
            
            return textoObjeto;
            
            }
        };
        
        textoObjeto.definirAltura = function(altura){
            
            textoObjeto.altura = altura;
                
        };
        
        textoObjeto.definirLarguraDOMElement = function(largura){
            
            textoObjeto.larguraDOMElement = largura;
                
        };
        
        textoObjeto.definirLarguraText = function(largura){
            
            textoObjeto.largura = largura;
                
        };
        
		observer = {
			notificar: function(){

				observer.notificado = true;

			}
		};
        
        redimensionadores = [{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6},{largura: 6}];
        
        editimage.fabricaRetangulo = editimage.fabricaRetanguloBase;

        
	});

    it('A fábrica de retangulos deve retornar a quantidade de redimensionadores necessários para criar um retangulo', function(){
        
        expect(editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores).toBeDefined();
        expect(editimage.fabricaRetangulo.retornarQuantidadeRedimensionadores()).toEqual(8);
        
        
    });
    
    it('Deve lançar uma exceção ao criar um retangulo sem os redimensionadores', function(){
        
        expect(function(){
            
            editimage.fabricaRetangulo.criar(observer, new createjs.Shape());
            
        }).toThrow(new Error('Informe os redimensionadores'));
        
    });
    
    it('Deve lançar uma exceção ao criar um retangulo o TextoObjeto', function(){
        
        expect(function(){
            
            var d = new editimage.Retangulo(observer, new createjs.Shape(),redimensionadores);
            
        }).toThrow(new Error('Informe o TextoObjeto'));
        
    });
    
    it('Deve lançar uma exceção ao criar um retangulo caso não tenham 8 redimensionadores', function(){
        
        expect(function(){editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), [{}])}).toThrow(new Error('Informe 8 redimensionadores'));
        
    });
    
	it('Deve criar um objeto Retangulo', function(){
            

		var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);

        expect(retangulo.largura).toBeDefined();
        expect(retangulo.altura).toBeDefined();
		expect(retangulo.retornarCreateObjeto).toBeDefined();
		expect(false).toEqual(textoObjeto.visivel)
		expect(true).toEqual(editimage.Retangulo.prototype instanceof editimage.EditimageObjeto);

	});
    
    it('Deve disparar o observer caso as propriedades altura e largura forem alteradas', function(){
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        retangulo.altura = 10;
        
        expect(true).toEqual(observer.notificado);
        
        observer.notificado = false;
        
        retangulo.largura = 20;
        
        expect(true).toEqual(observer.notificado);
        
    });

	it('Deve desenhar um retangulo', function(){

		var shape = new createjs.Shape();
		var rect = {};

		shape.graphics.drawRect = function(x,y,w,h){
			rect.x = x;
			rect.y = y;
			rect.w = w;
			rect.h = h;
		};

		var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);

		retangulo.desenhar();

		expect(50).toEqual(retangulo.coordenadaX);
		expect(50).toEqual(retangulo.coordenadaY);
		expect(100).toEqual(rect.w);
		expect(100).toEqual(rect.h);

	});
    
    it('Deve aplicar e remover a seleção ao retangulo', function(){
        
        var shape = new createjs.Shape();
		var evento = {};

		shape.addEventListener = function(pEvento, callback){
            evento[pEvento] = callback;
        };

		shape.dispararEvento = function(pEvento){
            evento[pEvento]();
        };

		var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);

		var shapeRetangulo = retangulo.retornarCreateObjeto();

		shapeRetangulo.dispararEvento('click');
        
        expect(true).toEqual(redimensionadores[0].visivel);
        expect(true).toEqual(redimensionadores[1].visivel);
        expect(true).toEqual(redimensionadores[2].visivel);
        expect(true).toEqual(redimensionadores[3].visivel);
        expect(true).toEqual(redimensionadores[4].visivel);
        expect(true).toEqual(redimensionadores[5].visivel);
        expect(true).toEqual(redimensionadores[6].visivel);
        expect(true).toEqual(redimensionadores[7].visivel);
        
        textoObjeto.edicao = true;
        retangulo.selecionado = false;
        
        expect(false).toEqual(redimensionadores[0].visivel);
        expect(false).toEqual(redimensionadores[1].visivel);
        expect(false).toEqual(redimensionadores[2].visivel);
        expect(false).toEqual(redimensionadores[3].visivel);
        expect(false).toEqual(redimensionadores[4].visivel);
        expect(false).toEqual(redimensionadores[5].visivel);
        expect(false).toEqual(redimensionadores[6].visivel);
        expect(false).toEqual(redimensionadores[7].visivel);
        expect(false).toEqual(textoObjeto.edicao);
        
        
    });
    
    it('Deve posicionar os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawRect = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
        
        expect(47).toEqual(redimensionadores[0].coordenadaX);
        expect(47).toEqual(redimensionadores[0].coordenadaY);
        
        expect(97).toEqual(redimensionadores[1].coordenadaX);
        expect(47).toEqual(redimensionadores[1].coordenadaY);
        
        expect(147).toEqual(redimensionadores[2].coordenadaX);
        expect(47).toEqual(redimensionadores[2].coordenadaY);
        
        expect(47).toEqual(redimensionadores[3].coordenadaX);
        expect(97).toEqual(redimensionadores[3].coordenadaY);
        
        expect(147).toEqual(redimensionadores[4].coordenadaX);
        expect(97).toEqual(redimensionadores[4].coordenadaY);
        
        expect(47).toEqual(redimensionadores[5].coordenadaX);
        expect(147).toEqual(redimensionadores[5].coordenadaY);
        
        expect(97).toEqual(redimensionadores[6].coordenadaX);
        expect(147).toEqual(redimensionadores[6].coordenadaY);
        
        expect(147).toEqual(redimensionadores[7].coordenadaX);
        expect(147).toEqual(redimensionadores[7].coordenadaY);
        
    });
    
    it('Deve reposicionar os redimensionadores caso o retangulo seja movido', function(){
        
        var shape = new createjs.Shape();
        var evento = {};
        
        shape.graphics.drawRect = function(x,y,w,h){
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
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
        expect(47).toEqual(redimensionadores[0].coordenadaX);
        expect(47).toEqual(redimensionadores[0].coordenadaY);
        
        expect(97).toEqual(redimensionadores[1].coordenadaX);
        expect(47).toEqual(redimensionadores[1].coordenadaY);
        
        expect(147).toEqual(redimensionadores[2].coordenadaX);
        expect(47).toEqual(redimensionadores[2].coordenadaY);
        
        expect(47).toEqual(redimensionadores[3].coordenadaX);
        expect(97).toEqual(redimensionadores[3].coordenadaY);
        
        expect(147).toEqual(redimensionadores[4].coordenadaX);
        expect(97).toEqual(redimensionadores[4].coordenadaY);
        
        expect(47).toEqual(redimensionadores[5].coordenadaX);
        expect(147).toEqual(redimensionadores[5].coordenadaY);
        
        expect(97).toEqual(redimensionadores[6].coordenadaX);
        expect(147).toEqual(redimensionadores[6].coordenadaY);
        
        expect(147).toEqual(redimensionadores[7].coordenadaX);
        expect(147).toEqual(redimensionadores[7].coordenadaY);        
        
        var shapeRetangulo = retangulo.retornarCreateObjeto();
        
        shapeRetangulo.dispararEventoMouseDown();
        shapeRetangulo.dispararEventoPressMove();        
        
        expect(57).toEqual(redimensionadores[0].coordenadaX);
        expect(57).toEqual(redimensionadores[0].coordenadaY);
        
        expect(107).toEqual(redimensionadores[1].coordenadaX);
        expect(57).toEqual(redimensionadores[1].coordenadaY);
        
        expect(157).toEqual(redimensionadores[2].coordenadaX);
        expect(57).toEqual(redimensionadores[2].coordenadaY);
        
        expect(57).toEqual(redimensionadores[3].coordenadaX);
        expect(107).toEqual(redimensionadores[3].coordenadaY);
        
        expect(157).toEqual(redimensionadores[4].coordenadaX);
        expect(107).toEqual(redimensionadores[4].coordenadaY);
        
        expect(57).toEqual(redimensionadores[5].coordenadaX);
        expect(157).toEqual(redimensionadores[5].coordenadaY);
        
        expect(107).toEqual(redimensionadores[6].coordenadaX);
        expect(157).toEqual(redimensionadores[6].coordenadaY);
        
        expect(157).toEqual(redimensionadores[7].coordenadaX);
        expect(157).toEqual(redimensionadores[7].coordenadaY);   
        
    });
    
    it('Quando os redimensionadores forem movidos, deve alterar o tamanho do retangulo', function(){
        
        var shape = new createjs.Shape();
        
        shape.graphics.drawRect = function(x,y,w,h){
            shape.x = x;
            shape.y = y;
			shape.graphics.command.x = x;
            shape.graphics.command.y = y;
            shape.graphics.command.w = w;
            shape.graphics.command.h = h;
		};
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
                      
        expect(100).toEqual(retangulo.largura);
        expect(100).toEqual(retangulo.altura);
        expect(50).toEqual(retangulo.coordenadaX);
        expect(50).toEqual(retangulo.coordenadaY);
        
        //Topo Esquerda
        redimensionadores[0].movimentacaoCallback({coordenadaX: 40, coordenadaY: 40});        
        expect(40).toEqual(retangulo.coordenadaX);
        expect(40).toEqual(retangulo.coordenadaY);
        expect(110).toEqual(retangulo.largura);
        expect(110).toEqual(retangulo.altura);        
        expect(37).toEqual(redimensionadores[0].coordenadaX);
        expect(37).toEqual(redimensionadores[0].coordenadaY);
                
        //Topo Meio
        redimensionadores[1].movimentacaoCallback({coordenadaX: 92 , coordenadaY: 27});
        expect(40).toEqual(retangulo.coordenadaX);
        expect(27).toEqual(retangulo.coordenadaY);
        expect(110).toEqual(retangulo.largura);
        expect(123).toEqual(retangulo.altura);
        expect(92).toEqual(redimensionadores[1].coordenadaX);
        expect(24).toEqual(redimensionadores[1].coordenadaY);
        
        //Topo Direita
        redimensionadores[2].movimentacaoCallback({coordenadaX: 157, coordenadaY: 17});        
        expect(40).toEqual(retangulo.coordenadaX);
        expect(17).toEqual(retangulo.coordenadaY);
        expect(117).toEqual(retangulo.largura);
        expect(133).toEqual(retangulo.altura);        
        expect(154).toEqual(redimensionadores[2].coordenadaX);
        expect(14).toEqual(redimensionadores[2].coordenadaY);
        
        //Meio Esquerda
        redimensionadores[3].movimentacaoCallback({coordenadaX: 30 , coordenadaY: 97});
        expect(30).toEqual(retangulo.coordenadaX);
        expect(17).toEqual(retangulo.coordenadaY);
        expect(127).toEqual(retangulo.largura);
        expect(133).toEqual(retangulo.altura); 
        expect(27).toEqual(redimensionadores[3].coordenadaX);
        expect(80.5).toEqual(redimensionadores[3].coordenadaY);
        
        //Meio Direira
        redimensionadores[4].movimentacaoCallback({coordenadaX: 164 , coordenadaY: 97});
        expect(30).toEqual(retangulo.coordenadaX);
        expect(17).toEqual(retangulo.coordenadaY);
        expect(134).toEqual(retangulo.largura);
        expect(133).toEqual(retangulo.altura); 
        expect(161).toEqual(redimensionadores[4].coordenadaX);
        expect(80.5).toEqual(redimensionadores[4].coordenadaY);
        
        //Baixo Esquerda
        redimensionadores[5].movimentacaoCallback({coordenadaX: 20 , coordenadaY: 157});
        expect(20).toEqual(retangulo.coordenadaX);
        expect(17).toEqual(retangulo.coordenadaY);
        expect(144).toEqual(retangulo.largura);
        expect(140).toEqual(retangulo.altura); 
        expect(17).toEqual(redimensionadores[5].coordenadaX);
        expect(154).toEqual(redimensionadores[5].coordenadaY);
        
        //Baixo Meio
        redimensionadores[6].movimentacaoCallback({coordenadaX: 97 , coordenadaY: 164});
        expect(20).toEqual(retangulo.coordenadaX);
        expect(17).toEqual(retangulo.coordenadaY);
        expect(144).toEqual(retangulo.largura);
        expect(147).toEqual(retangulo.altura);
        expect(89).toEqual(redimensionadores[6].coordenadaX);
        expect(161).toEqual(redimensionadores[6].coordenadaY);
                
        //Baixo Direita
        redimensionadores[7].movimentacaoCallback({coordenadaX: 171, coordenadaY: 171});        
        expect(20).toEqual(retangulo.coordenadaX);
        expect(17).toEqual(retangulo.coordenadaY);
        expect(151).toEqual(retangulo.largura);
        expect(154).toEqual(retangulo.altura);        
        expect(168).toEqual(redimensionadores[7].coordenadaX);
        expect(168).toEqual(redimensionadores[7].coordenadaY);
        
    });
    
    it('O retangulo deve setar cursor os redimensionadores', function(){
        
        var shape = new createjs.Shape();
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);
        
        expect('nw-resize').toEqual(redimensionadores[0].cursor);
        expect('n-resize').toEqual(redimensionadores[1].cursor);
        expect('ne-resize').toEqual(redimensionadores[2].cursor);
        expect('w-resize').toEqual(redimensionadores[3].cursor);
        expect('e-resize').toEqual(redimensionadores[4].cursor);
        expect('sw-resize').toEqual(redimensionadores[5].cursor);
        expect('s-resize').toEqual(redimensionadores[6].cursor);
        expect('se-resize').toEqual(redimensionadores[7].cursor);
        
    });
    
    it('Deve retornar os redimensionadores', function(){
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        var redimensionadoresRetornados = retangulo.retornarRedimensionadores();
        
        expect(true).toEqual(redimensionadoresRetornados === redimensionadores);
    });
    
    it('Deve posicionar o TextoObjeto', function(){
                
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        retangulo.coordenadaX = 20;
        retangulo.coordenadaY = 40;
        
        retangulo.posicionarTextoObjeto();
        
        expect(21).toEqual(textoObjeto.coordenadaX);
        expect(41).toEqual(textoObjeto.coordenadaY);
        
    });
    
    it('Deve redimensionar o TextoObjeto', function(){
        
        textoObjeto.definirAltura = function(altura){
            
            textoObjeto.altura = altura;
                
        };
        
        textoObjeto.definirLargura = function(largura){
            
            textoObjeto.largura = largura;
                
        };
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        retangulo.largura = 20;
        retangulo.altura = 40;
        
        retangulo.redimensionarTextoObjeto();
        
        expect(7).toEqual(textoObjeto.largura);
        expect(32).toEqual(textoObjeto.altura);
        
    });
    
    it('Quando redimensionar o retângulo deve redimensionar e reposicionar o TextoObjeto', function(){
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        textoObjeto.coordenadaX = 0;
        textoObjeto.altura = 0;
        textoObjeto.largura = 0;
        
        retangulo.coordenadaX = 20;
        retangulo.coordenadaY = 40;
        retangulo.largura = 0;
        retangulo.altura = 0;
        
        retangulo.largura = 20;
        expect(7).toEqual(textoObjeto.largura);
        expect(21).toEqual(textoObjeto.coordenadaX);
        
        textoObjeto.coordenadaY = 0;
        retangulo.altura = 40;
        expect(32).toEqual(textoObjeto.altura);
        expect(41).toEqual(textoObjeto.coordenadaY);
        
    });
    
    it('Quando o retângulo for movido, deve reposicionar o TextObjeto', function(){
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        textoObjeto.coordenadaX = 0;
        textoObjeto.coordenadaY = 0;
        
        retangulo.coordenadaX = 20;
        retangulo.coordenadaY = 40;
        
        retangulo.movimentacaoTemplateMethod();
        
        expect(21).toEqual(textoObjeto.coordenadaX);
        expect(41).toEqual(textoObjeto.coordenadaY);
        
    });
    
    it('Deve retornar o TextoObjeto', function(){
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        expect(true).toEqual(retangulo.retornarTextoObjeto() === textoObjeto);
        
    });
    
    it('Quando criar no botão Texto no painel de ferramentas, deve mostrar a caixa o TextoObjeto', function(){
        
        var retangulo = editimage.fabricaRetangulo.criar(observer, new createjs.Shape(), redimensionadores);
        
        var ferramentas = retangulo.retornarFerramentas();
        
        var botao = ferramentas.querySelectorAll('button')[0];
        
        textoObjeto.coordenadaX = 0;
        textoObjeto.coordenadaY = 0;
        textoObjeto.altura = 0;
        textoObjeto.largura = 0;
        
        retangulo.coordenadaX = 20;
        retangulo.coordenadaY = 40;
        retangulo.largura = 20;
        retangulo.altura = 40;
        
        botao.onclick();
        
        expect(true).toEqual(textoObjeto.visivel);
        expect(true).toEqual(textoObjeto.edicao);
        
        expect(21).toEqual(textoObjeto.coordenadaX);
        expect(41).toEqual(textoObjeto.coordenadaY);
        expect(7).toEqual(textoObjeto.largura);
        expect(32).toEqual(textoObjeto.altura);
        
    });
    
    it('No doubleclick do retangulo, deve habilitar a edição do texto se o TextoObjeto estiver visivel', function(){
        
        var shape = new createjs.Shape();
		var evento = {};
        
        textoObjeto.edicao = false;
        
		shape.addEventListener = function(pEvento, callback){

					evento[pEvento] = callback;

				};

		shape.dispararEvento = function(pEvento){

					evento[pEvento]();

				};

		var retangulo = editimage.fabricaRetangulo.criar(observer, shape, redimensionadores);

		var shape = retangulo.retornarCreateObjeto();
        
        textoObjeto.visivel = true;
        
		shape.dispararEvento('dblclick');

		expect(true).toEqual(textoObjeto.edicao);
        
    });

});