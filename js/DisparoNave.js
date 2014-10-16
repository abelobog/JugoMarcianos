//si usase un namespace propio, necesito asegurarme que el namespace ha sido generado
//this.mynamespace = this.myNameSpace;
//y luego en la última línea sustituiría window por this.mynamespace
//y después, fuera de la clase puedo acceder a ella con var myObject = new mynamespace.MyClass();

//inicio la clase
//se trata como una función anónima
(function(scope){
	//constructor de la clase
	function DisparoNave(image, posX, posY){
		this.initialize(image, posX, posY);
	}
	
	DisparoNave.prototype = new createjs.Bitmap()
	DisparoNave.prototype.Bitmap_init = DisparoNave.prototype.initialize;
	
	var ancho = DisparoNave.prototype;
	
	//implemento la nueva inicialización del objeto
	DisparoNave.prototype.initialize = function (image, posX, posY){
		this.ancho = 6;
		
		this.Bitmap_init(image);
		this.x = posX;
		this.y = posY;
		app.stage.addChild(this);
		
		//ejecuto el resto de valores
		this.snapToPixel = true;
		this.velocity = {x:0,y:-15};
		
		window.app.playPop();
	}
	
	//este onTick lo llevan se llama para todos los objetos añadidos al stage
	DisparoNave.prototype.onTick = function (){
		if(this.y < 0){
			window.app.disparo = null;
			app.stage.removeChild(this);
		}else if(this.velocity.y < 0){
			this.y += this.velocity.y;
		}
		
		
	}
	
	DisparoNave.prototype.destroy = function (){
		window.app.disparo = null;
		app.stage.removeChild(this);
		
	}
	
	
	//esto para poder acceder desde fuera del namespace
	scope.DisparoNave = DisparoNave;
	
	//se asocia al namespace window que es tanto como usar _global
}(window));