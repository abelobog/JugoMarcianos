//si usase un namespace propio, necesito asegurarme que el namespace ha sido generado
//this.mynamespace = this.myNameSpace;
//y luego en la última línea sustituiría window por this.mynamespace
//y después, fuera de la clase puedo acceder a ella con var myObject = new mynamespace.MyClass();

//inicio la clase
//se trata como una función anónima
(function(scope){
	//constructor de la clase
	function Malo(spriteSheet){
		this.initialize(spriteSheet);
	}
	
	Malo.prototype = new createjs.BitmapAnimation()
	Malo.prototype.BitmapAnimation_init = Malo.prototype.initialize;
	
	var ancho = Malo.prototype;
	var alto = Malo.prototype;
	
	//implemento la nueva inicialización del objeto
	Malo.prototype.initialize = function (spriteSheet){
		this.BitmapAnimation_init(spriteSheet);
 		
		this.gotoAndPlay("run");
		
		this.ancho = spriteSheet.getFrame(0).rect.width;
		this.alto = spriteSheet.getFrame(0).rect.height;
		
		
		
		//ejecuto el resto de valores
		this.snapToPixel = true;
		
	}
	
	Malo.prototype.onTick = function (){
		if(this.currentFrame == 24){
			this.parent.removeChild(this);
		}
	}
	
	//este onTick lo llevan se llama para todos los objetos añadidos al stage
	
	
	Malo.prototype.explota = function (){
		window.app.playBoom();
		this.gotoAndPlay("boom");
	}
	
	
	//esto para poder acceder desde fuera del namespace
	scope.Malo = Malo;
	
	//se asocia al namespace window que es tanto como usar _global
}(window));