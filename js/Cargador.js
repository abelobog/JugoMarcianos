(function(scope){
	function Cargador(){
		this.initialize();
	}
	
	var cargadas = Cargador.prototype;
	var totales = Cargador.prototype;
	
	Cargador.prototype.initialize = function(){
		this.cargadas = 0;
		this.totales = 0;
	}
	
	Cargador.prototype.loadImagenes = function(lista){
		this.cargadas = 0;
		this.totales = lista.length;
		for (var i = 0; i < lista.length; i++) {
			this.cargaImagen(lista[i]);
		}
	}
	
	Cargador.prototype.cargaImagen = function(ruta){
		var self = this;
		var image = new Image();
		this[ruta] = image;
		image.onload = function(e){
								self.imagenCargada(e);
		};
		image.src = image.url = ruta;
	}
	
	Cargador.prototype.imagenCargada = function(e){
		this.cargadas ++;
		console.log("imagen cargada: " + this.cargadas + " de " + this.totales);
		
		if(this.cargadas == this.totales){
			//con esta línea nos aseguramos que onComplete se llame si ha sido creado
			if ( this.onComplete ){
				 this.onComplete();
			}else{
				console.log("onComplete no definido en Cargador");
			}
		}
	}
	
	scope.Cargador = Cargador;
}(window));