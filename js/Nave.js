//si usase un namespace propio, necesito asegurarme que el namespace ha sido generado
//this.mynamespace = this.myNameSpace;
//y luego en la última línea sustituiría window por this.mynamespace
//y después, fuera de la clase puedo acceder a ella con var myObject = new mynamespace.MyClass();

//inicio la clase
//se trata como una función anónima
(function(scope){
	//constructor de la clase
	function Nave(spriteSheet){
		this.initialize(spriteSheet);
	}
	
	//si no se pone prototype en los métodos, se convierten en estáticos
	Nave.prototype = new createjs.BitmapAnimation()
	Nave.prototype.BitmapAnimation_init = Nave.prototype.initialize;
	
	var ancho = Nave.prototype;
	var alto = Nave.prototype;
	var explotando = Nave.prototype;
	
	//implemento la nueva inicialización del objeto
	Nave.prototype.initialize = function (spriteSheet){
		this.BitmapAnimation_init(spriteSheet);
		
		var self = this;
		
		console.log("Inicializando Nave");
		
		this.gotoAndPlay("run");
		
		this.x = 256;
		this.y = 100;
		this.ancho = spriteSheet.getFrame(0).rect.width;
		this.alto = spriteSheet.getFrame(0).rect.height;
		
		//ejecuto el resto de valores
		this.snapToPixel = true;
		this.velocity = {x:0,y:-15};
		
		this.addEventListener("mousedown", function(e){
													self.handleMouseDown(e);
											});
											
		
	}
	
	//este onTick lo llevan se llama para todos los objetos añadidos al stage
	Nave.prototype.onTick = function (){
		this.velocity.y += 1;
		if(this.velocity.y < 0 || this.y < 500){
			this.y += this.velocity.y;
		}
		
		if(this.velocity.x != 0){
			if(this.velocity.x > 0){
				this.velocity.x -= 1;
			}else{
				this.velocity.x += 1;
			}
			
			this.x += this.velocity.x;
		}
		
		if(this.currentFrame == 39){
			this.gotoAndPlay("run");
		}else if(this.currentFrame == 71){
			window.app.fin();
			this.parent.removeChild(this);
		}
	}
	
	Nave.prototype.salta = function (e){
		if(!this.explotando){
		
			if((e.stageX >= this.x) && (e.stageX < this.x + this.ancho)){
			}else if(e.stageX > this.x){
				window.app.playFire();
				this.velocity.x = +10;
			}else if(e.stageX < this.x){
				window.app.playFire();
				this.velocity.x = -10;
			}
			
			if(e.stageY <= this.y - 20){
				window.app.playFire();
				this.velocity.y = -15;
			}else if(e.stageY > this.y - 20 && e.stageY < this.y + this.alto){
				this.velocity.y = +0;
			}else{
				window.app.playFire();
				this.velocity.y = +15;
			}
			
			
			this.gotoAndPlay("fire");
		}
	}
	
	Nave.prototype.handleMouseDown = function (e){
		if(!this.explotando){
			this.dispara();
		}
	}
	
	Nave.prototype.dispara = function (e){
		this.velocity.y = 0;
		this.velocity.x = 0;
		this.gotoAndPlay("run");
			
		window.app.disparoNave(this.x + this.ancho/2 - 8, this.y);
	}
	
	Nave.prototype.explota = function (){
		window.app.playBoom();
		this.explotando = true;
		this.gotoAndPlay("boom");
	}
	
	//esto para poder acceder desde fuera del namespace
	scope.Nave = Nave;
	
	//se asocia al namespace window que es tanto como usar _global
}(window));