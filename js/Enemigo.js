"use script"

class Enemigo extends Personaje {
    
    constructor() {
        super();   
        this.enemigo = document.createElement("div");
        this.contenedor =  document.getElementById("contenedor")
    }
    start(){
       
        // this.enemigo.style.display = "block";
        this.enemigo.classList.add("enemigo");
        this.contenedor.appendChild(this.enemigo);
    }
    status() {
        return this.enemigo.getBoundingClientRect();
    }
    reset() {
            this.contenedor.removeChild(this.enemigo);
            // this.enemigo.style.display = "none";     
    }
}