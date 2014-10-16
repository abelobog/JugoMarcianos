(function(scope){
	function App(){
		this.initialize();
	}
	
	var canvas = App.prototype;
	var stage = App.prototype;
	var fondo = App.prototype;
	var nave = App.prototype;
	var bitmap = App.prototype;
	var cargador = App.prototype;
	var cargador = App.prototype;
	var contenedorMalos = App.prototype;
	var disparo = App.prototype;
	var _fps = App.prototype;
	
	var SOUNDS = App.prototype;
	var sonidosCargados = App.prototype;
	
	var rutaNave = "assets/nave.png";
	var _rutaMalo = "assets/malo.png";
	var rutaFondo = "assets/nebulosa.jpg";
	var rutaDispNave = "assets/DisparoNave.png";
	var rutaDispMalo = "assets/DisparoMalo.png";
	
	var rutaMalo = App.prototype;
	
	App.prototype.initialize = function (){
		this.rutaMalo = _rutaMalo;
		this._fps = 40;
		
		var self = this;
		
		//cargo los elementos iniciales
		this.canvas = document.createElement('canvas');
		this.canvas.width = 600;
		this.canvas.height = 600;
		var contenedor = document.getElementById("juego");
		contenedor.appendChild(this.canvas);
		
		this.stage = new createjs.Stage(this.canvas);
		
		this.cargador = new Cargador();
		this.cargador.onComplete = function(){
			self.assetsCargados();
		};
		this.cargador.loadImagenes([this.rutaMalo, rutaNave, rutaFondo, rutaDispNave, rutaDispMalo]);
		/*this.image = new Image();
		this.image.onload = function(e){
								self.imagenCargada(e);
		};
		this.image.src = "assets/avatar.png";
		*/
		
		
		//aquí lo que hago es comprobar si se pueden activar los eventos touch para dispositivos
		if(createjs.Touch.isSupported()){
			createjs.Touch.enable(this.stage);
		}
		
		this.stage.addEventListener("stagemousedown", function(e){
																self.handleMouseDown(e);
																});
	};
	
	App.prototype.assetsCargados = function(){
		console.log("Carga inicial de elementos completada");
		this.loadSounds();
		//cuando se han cargado los sonidos, desde soundsLoaded se pintan los elementos gráficos
	};
	
	App.prototype.imagenCargada = function(){
		var bmp = this.cargador[rutaFondo];
		this.fondo = new createjs.Bitmap(bmp);
		this.fondo.alpha = 0.8;
		this.stage.addChild(this.fondo);
		
		//esto crearía un gráfico estático con características de nave
		//this.nave = new Personaje(this.avatar);
		//this.stage.addChild(this.rutaNave);
		//aquí creo el nave animado
		var dataNave = {
		 images: [this.cargador[rutaNave] ],
		 frames: {width:103, height:90},
		 animations: {run:[0,19], fire:[19,47,"fire"], boom:[48,71,"boom"]}
		};
		var spriteSheet = new createjs.SpriteSheet(dataNave);
		this.nave = new Nave(spriteSheet);
		this.stage.addChild(this.nave);
		
		
		
		//cargando los malos
		var self = this;
		createjs.Ticker.setFPS(this._fps);
		createjs.Ticker.addListener(function(e){
										self.tick();
										});
		createjs.Ticker.addListener(this.tickCreaMalos);
	};
	
	
	App.prototype.tickCreaMalos = function (){
		var app = window.app;
		var punto = app.nave.localToGlobal(app.nave.x, app.nave.y);
		if(punto.y > 200){
			//creo el contenedor donde van los malos
			var contenedor = new ContenedorMalos();
			app.stage.addChild(contenedor);
			contenedorMalos.x = 0;
			contenedorMalos.y = 0;
			app.contenedorMalos = contenedor;
			createjs.Ticker.removeListener(app.tickCreaMalos);
		}
	};
	
	App.prototype.tick = function (e){
		if(this.contenedorMalos){
			this.contenedorMalos.testDisparoNave(this.disparo);
			this.contenedorMalos.testChoqueNave(this.nave);
		}
		this.stage.update();
	};
	
	App.prototype.handleMouseDown = function (e){
		this.nave.salta(e);
	};
	
	App.prototype.disparoNave = function (posX, posY){
		if(this.disparo == null){
			this.disparo = new DisparoNave(this.cargador[rutaDispNave], posX, posY);
		}
	};
	
	App.prototype.fin = function(){
		window.location.href="gameOver.html";
	};
	/*
	App.prototype.acelera = function(){
		this._fps += 10;
		createjs.Ticker.setFPS(this._fps);
	}*/
	
	App.prototype.loadSounds = function() {
		sonidosCargados = 0;
		var registeredPlugins = createjs.Sound.registerPlugins([
													createjs.CocoonJSAudioPlugin,
													createjs.WebAudioPlugin,
													createjs.HTMLAudioPlugin
																]);
		if (registeredPlugins) {
			createjs.Sound.addEventListener("loadComplete", createjs.proxy(this.soundsLoaded,this));
			SOUNDS.SOUNDS = {};
			SOUNDS.SOUNDS.BOOM = 'sfx/boom.m4a|sfx/boom.ogg';
			createjs.Sound.registerSound(SOUNDS.SOUNDS.BOOM, "BOOM", 3);
			SOUNDS.SOUNDS.POP = 'sfx/pop.m4a|sfx/pop.ogg';
			createjs.Sound.registerSound(SOUNDS.SOUNDS.POP, "POP", 3);
			SOUNDS.SOUNDS.FIRE = 'sfx/fire.m4a|sfx/fire.ogg';
			createjs.Sound.registerSound(SOUNDS.SOUNDS.FIRE, "FIRE", 4);
		}
	};

	
	App.prototype.soundsLoaded = function(e) {
		sonidosCargados ++;
		if ( sonidosCargados == 3 ){
			console.log("Sonidos cargados");
			//creo los elementos
				
			this.imagenCargada();
			
		}
	};
	
	App.prototype.playBoom = function() { 
		var _boom = createjs.Sound.play(SOUNDS.SOUNDS.BOOM);
	} ;
	App.prototype.playPop = function() { 
		var _pop = createjs.Sound.play(SOUNDS.SOUNDS.POP);
	} ;
	App.prototype.playFire = function() { 
	  var myInstance = createjs.Sound.createInstance("FIRE");
	  myInstance.play();
		
	} ;
	
	
	scope.App = App;
}(window));

window.onload = function(){
	this.app = new App();
};