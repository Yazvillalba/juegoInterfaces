"use script"


//INICIOOO JUEGOOO
//puntaje
let puntajeFinalGameOver = document.getElementById("puntajeFinalGameOver");
let contenedorPuntaje = document.querySelector('.puntaje');
let puntajeActual;
let descuentoPorColisionEnemigo = 15000;

let inicioJuego = document.querySelector('.ingreso');
let contenedorJuego = document.getElementById("contenedor");
let btnsJuegoNuevo = document.querySelectorAll('.btn-juegoNuevo');
let jugar = document.getElementById('jugar');
let contenedorGameOver = document.querySelector('.gameOver');
let contenedorGanar = document.querySelector('.ganar');

let juego = false;
let gameOver = false;
let contadorDistancia = 0;

//vidas
let vida = document.querySelector(".vida");
let vidasCantidad = 3;

//personaje
let charlie = new Acciones();
let enemigos = [];

//musica
const musica = new Musica();
let interval;
let intervalGenerarEnemigo;
//click boton jugar
jugar.addEventListener("click", function (e) {
    inicioJuego.classList.add("desaparecer");
    actualizarEstado();
   
    document.addEventListener("keydown", (e) => {
        charlie.correr();
        if (e.code == "ArrowUp" && juego) { //=== o ==
            charlie.saltar();
            musica.saltarMusica();
        }
    });
})

//cuando pierde las 3 vidas aparece button jugar de nuevo
for (let juegoNuevo of btnsJuegoNuevo) {
    juegoNuevo.addEventListener('click', () => {
        actualizarEstado(); 
        ganar.reset();
        vida.classList.add("vida");
        contenedorGameOver.classList.add('desaparecer');
        contenedorGanar.classList.add('desaparecer');
        console.log(contadorDistancia);
    })
}
//actualizo vidas, contadores,puntaje,etc para cada vez que se inicia la partida
function actualizarEstado() {
    musica.musicaFondo();
    juego = true;
    vidasCantidad = 3;
    puntajeActual = 0;
    contadorDistancia = 0;
    generarCartelDistancia()
    
    contenedorJuego.classList.remove("desaparecer");
    interval = setInterval(gameLoop, 50);
    intervalGenerarEnemigo = setInterval(generarEnemigo, 3000);
}
function generarEnemigo() {
    let enemigo = new Enemigo();
    enemigos.push(enemigo);
    enemigo.start();
}


//MONO AZUL BONUUS
//  setInterval(generarBonus, 5000);
//  let bonus = new Bonus();;
//  function generarBonus(){

//      bonus.generarbonus();
//  }
/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {

    colision();
    colisionBonus();
    desaparecerMono();
    desaparecerCartelDistancia();
    ganarJuego();

    if (juego) {
        requestAnimationFrame(gameLoop);
        contenedorPuntaje.textContent = puntajeActual++;
    } else {
        clearInterval(interval);
        clearInterval(intervalGenerarEnemigo);
        contenedorJuego.classList.add('desaparecer');
        contenedorGameOver.classList.remove('desaparecer');
        puntajeFinalGameOver.innerHTML = "puntos: " +puntajeActual;
        console.log(contadorDistancia);
    }
}

function colision() {
    const personajeRect = getReducedCollisionRect();

    for (let i = 0; i < enemigos.length; i++) {
        const enemigoRect = enemigos[i].status();

        if (
            personajeRect.left < enemigoRect.right &&
            personajeRect.right > enemigoRect.left &&
            personajeRect.top < enemigoRect.bottom &&
            personajeRect.bottom > enemigoRect.top

        ) {
            collisionDetected = true;

            let enemigoActual = enemigos[i];
            enemigoActual.reset();
            enemigos.splice(i, 1);

            charlie.perder();
            perdervidas();
            break;
        }
    }
}
function getReducedCollisionRect() {
    const rect = charlie.status();
    const reductionAmount = 30;

    const reducedRect = {
        top: rect.top + reductionAmount,
        bottom: rect.bottom - reductionAmount,
        left: rect.left + reductionAmount,
        right: rect.right - reductionAmount
    };

    return reducedRect;
}

function perdervidas() {
    switch (vidasCantidad) {
        case 3:
            vida.classList.remove("vida");
            vida.classList.add("dosVidas");

            vidasCantidad = 2;
            puntajeActual -= descuentoPorColisionEnemigo;
            break;
        case 2:
            vida.classList.remove("dosVidas");
            vida.classList.add("unaVida");
            vidasCantidad = 1;
            puntajeActual -= descuentoPorColisionEnemigo;

            break;
        case 1:
            vida.classList.remove("unaVida");
           
            vidasCantidad = 0;
            musica.gameOver();
            gameOver = true;
            juego = false; 
            puntajeActual -= descuentoPorColisionEnemigo;
            musica.pararMusica();
            break;
        default:

            break;
    }
}
function colisionBonus() {
    const bonus = document.getElementsByClassName('bonus');
    const enemigos = document.getElementsByClassName('enemigo');

    let collisionDetected = false;


    for (let x = 0; x < bonus.length; x++) {
        const bonusRect = getReducedCollisionRect(bonus[x]);

        for (let i = 0; i < enemigos.length; i++) {
            const enemigoRect = enemigos[i].getBoundingClientRect();

            if (
                bonusRect.left < enemigoRect.right &&
                bonusRect.right > enemigoRect.left &&
                bonusRect.top < enemigoRect.bottom &&
                bonusRect.bottom > enemigoRect.top
            ) {
                collisionDetected = true;
                document.getElementById('display').innerHTML = '¡Colisión detectada!';
                break;
            }
        }

        if (collisionDetected) {
            break;
        }
    }

    if (collisionDetected) {
        saltar();
    }
}
function saltar() {
    bonus.saltar();
}

function desaparecerMono() {
    for (let i = 0; i < enemigos.length; i++) {
        const enemigoRect = enemigos[i].status();
        if (enemigoRect.left <= 0) {
            let enemigoActual = enemigos[i];
            enemigoActual.reset();
            enemigos.splice(i, 1); //cuantos elementos borro de la posicion q le doy
            break;
        }
    }
}


let distancias = [];

let ganar = new Ganar();
function generarCartelDistancia() {
    contadorDistancia += 1;
    if (contadorDistancia <= 5) {
       
        let distancia = new Distancia();
        distancias.push(distancia);
        distancia.start(contadorDistancia);
        
    }
    if (contadorDistancia >= 6) {
        ganar.plataforma();
    }

}
function desaparecerCartelDistancia() {
    for (let i = 0; i < distancias.length; i++) {
        const distanciaRect = distancias[i].status();
        if (distanciaRect.left <= 0) {
            distanciaActual = distancias[i];
            distanciaActual.reset();
            distancias.splice(i, 1);
            if (contadorDistancia <= 5) {
                generarCartelDistancia();
                ganarJuego();
                
            }
            break;
        }
    }
}
generarCartelDistancia();

//GANAR

function ganarJuego() {
    const personajeRect = charlie.status();

    
    const plataformaRect = ganar.status();

    if (
        personajeRect.left < plataformaRect.right &&
        personajeRect.right > plataformaRect.left &&
        personajeRect.bottom > plataformaRect.top &&
        personajeRect.top < (plataformaRect.top + 5)

    ) {
        collisionDetected = true;
        contenedorJuego.classList.add('desaparecer');
        contenedorGanar.classList.remove('desaparecer');
        musica.pararMusica();
        puntajeFinal.innerHTML = puntajeActual;
    }
}