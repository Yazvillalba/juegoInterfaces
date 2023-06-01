"use script"
class Musica{
    
    constructor() {
        this.musicFondo = new Audio();
        this.musicFondo.src = "../Stage2.mp3";
        this.gameover = new Audio();
        this.gameover.src = "../FallingDown.wav";
        this.saltar = new Audio();
        this.saltar.src = "../PlayerJump.wav";
        this.gameOver2 = new Audio();
        this.gameOver2.src = "../GameOver.wav";
    }
    musicaFondo(){
       this.musicFondo.play();
    }
    pararMusica() {
        this.musicFondo.volume = 0;
        this.musicFondo.pause();
        this.musicFondo.currentTime = 0;
    }
    saltarMusica(){
        this.saltar.play();
    }
    gameOver() {
        this.gameover.play();
        this.gameOver2.play();
    }

}