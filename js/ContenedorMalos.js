//si usase un namespace propio, necesito asegurarme que el namespace ha sido generado
//this.mynamespace = this.myNameSpace;
//y luego en la última línea sustituiría window por this.mynamespace
//y después, fuera de la clase puedo acceder a ella con var myObject = new mynamespace.MyClass();

//inicio la clase
//se trata como una función anónima
(function(scope){
	//constructor de la clase
	function ContenedorMalos(){
		this.initialize();
	}
	
	//si no se pone prototype en los métodos, se convierten en estáticos
	ContenedorMalos.prototype = new createjs.Container()
	ContenedorMalos.prototype.Container_init = ContenedorMalos.prototype.initialize;
	
	var malos = ContenedorMalos.prototype;
	var indiceMalos = ContenedorMalos.prototype;
	var topeMalos = ContenedorMalos.prototype;
	var filas = ContenedorMalos.prototype;
	var pasos = ContenedorMalos.prototype;
	var initY = ContenedorMalos.prototype;
	var cargado = ContenedorMalos.prototype;
	
	var vX = ContenedorMalos.prototype;
	var vY = ContenedorMalos.prototype;
	
	//implemento la nueva inicialización del objeto
	ContenedorMalos.prototype.initialize = function (){
		this.Container_init();
		
		this.vX = 6;
		this.vY = 70;
		this.velocity = {x:this.vX,y:0};
		this.init();
	}
	
	ContenedorMalos.prototype.init = function (){
		var self = this;
		this.cargado = false;
		
		console.log("Inicializando ContenedorMalos");
		
		this.x = 0;
		this.y = 0;
		
		this.malos = new Array();
		this.indiceMalos = 0;
		this.topeMalos = 7;
		this.filas = 3;
		this.pasos = 0;
		this.initY = 60;
		
		this.snapToPixel = true;
		
		
		createjs.Ticker.addListener(this.tickCreador);
		
	}
	
	//este onTick lo llevan se llama para todos los objetos añadidos al stage
	ContenedorMalos.prototype.onTick = function (){
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		
		if(this.velocity.y < 0 || this.y < 500){
			this.y += this.velocity.y;
		}
		
		if(this.x >= 200 ){
			this.velocity.x = this.velocity.x * -1;
		} else if (this.x <= -200){
			this.velocity.x = this.velocity.x * -1;
			if(this.pasos < 3){
				this.pasos ++;
			}else{
				this.pasos = 0;
				this.y += this.vY;
				if(this.y > 550){
					this.y = 0;
				}
			}
		}
	}
	
	ContenedorMalos.prototype.creaMalo = function(){
		if(!this.cargado){
			if(this.indiceMalos < this.topeMalos * this.filas){
				var dataMalo = {
				 images: [window.app.cargador[window.app.rutaMalo] ],
				 frames: {width:33, height:31},
				 animations: {run:[0,12],   boom:[13,24,"boom"]}
				};
				
				var posY = Math.floor(this.indiceMalos / this.topeMalos);
				var posX = this.indiceMalos - (posY * this.topeMalos);
				
				var spriteSheet = new createjs.SpriteSheet(dataMalo);
				var malo = new Malo(spriteSheet);
				malo.x = 50 + posX*80;
				malo.y = this.initY + posY * 60;
				this.addChild(malo);
					
				this.malos.push(malo);
				this.indiceMalos ++;
			}else{
				this.cargado = true;
				createjs.Ticker.removeListener(this.tickCreador);
			}
		}
	}
	
	
	ContenedorMalos.prototype.tickCreador = function (){
		window.app.contenedorMalos.creaMalo();
	}
	
	ContenedorMalos.prototype.testDisparoNave = function (disparo){
		if(disparo != null){
			for(var i = 0; i<this.malos.length; i++){
				var malo = this.malos[i];
			
				col = ndgmr.checkRectCollision(malo,disparo);
				if ( col ) {
					malo.explota();
					this.malos.splice(i, 1);
					disparo.destroy();
					this.testTotales();
					break;
				}
			}
		}
	}
	
	ContenedorMalos.prototype.testChoqueNave = function (nave){
		if(nave != null){
			for(var i = 0; i<this.malos.length; i++){
				var malo = this.malos[i];
			
				col = ndgmr.checkRectCollision(malo,nave);
				if ( col ) {
					malo.explota();
					this.malos.splice(i, 1);
					nave.explota();
					break;
				}
			}
		}
	}
	
	ContenedorMalos.prototype.testTotales = function (){
		if(this.malos.length == 0){
			this.init();
			//window.app.acelera();
			this.acelera();
		}
	}
	
	ContenedorMalos.prototype.acelera = function (){
		this.velocity.x += 2;
		
	}
	
	//esto para poder acceder desde fuera del namespace
	scope.ContenedorMalos = ContenedorMalos;
	
	//se asocia al namespace window que es tanto como usar _global
}(window));