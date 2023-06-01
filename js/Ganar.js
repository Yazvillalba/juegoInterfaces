"use strict"
class Ganar extends Personaje {
    
    constructor() {
        super();   
        this.ganar = document.createElement("div");
        this.plataformaGanar =  document.getElementById("contenedorPlataformaGanar");
    }
    plataforma(){
       
        this.ganar.classList.add("plataformaGanar");
        this.ganar.style.display = "block";
        this.plataformaGanar.appendChild(this.ganar);
    }
    status() {
        return this.ganar.getBoundingClientRect();
    }
    reset() {
        this.ganar.style.display = "none";
    }


}