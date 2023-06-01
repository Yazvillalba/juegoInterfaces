"use script"

class Distancia extends Personaje {
    
    constructor() {
        super();   
        this.distancia = document.createElement("div");
        this.contenedorDistancia =  document.getElementById("contenedorDistancia");
    }
    start(numero){
       
        this.distancia.classList.add("distancia");
        this.distancia.style.background = `url('../imagenes/distancia${numero}.png')`;
        this.distancia.style.backgroundSize =  "120px 100%";
        
        this.contenedorDistancia.appendChild(this.distancia);
    }
    status() {
        return this.distancia.getBoundingClientRect();
    }
    reset() {
            this.contenedorDistancia.removeChild(this.distancia);
            
    }


}