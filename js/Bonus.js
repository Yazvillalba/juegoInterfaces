"use script"

class Bonus extends Personaje {
    
    constructor() {
        super();   
        
    }
    generarbonus() {
        this.bonus = document.createElement("div");
        this.bonus.classList.add("bonus");

        document.getElementById("contenedor").appendChild(this.bonus);
    }
    status() {
        this.bonus.getBoundingClientRect();
    }
    reset() {
        // this.enemigo.classList.add("enemigo");
    }
   
    saltar() {
        if(this.bonus.classList.contains("bonus")) {       

        this.clean();
        this.bonus.classList.add("monoBonusSalto");
        this.bonus.addEventListener("animationend", () => {
            this.caer();
        });
    }
    }
    caer() {
        this.clean();
        this.bonus.classList.add("monoBonusCaer");
         this.bonus.addEventListener("animationend", () => {
            this.generarbonus();
        }); 
        
    }
    clean() {
        this.bonus.classList.remove("bonus");
        this.bonus.classList.remove("monoBonusSalto");
        this.bonus.classList.remove("monoBonusCaer");
        this.bonus.removeEventListener("animationend", () => { });
    }
}