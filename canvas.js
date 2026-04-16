const canvas = document.getElementById('lienzoAtomo');
const ctx = canvas.getContext('2d');
let anguloActual = 0;
// --- FUNCIONES DE DIBUJO ---
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;
function dibujarNucleo() {
    ctx.beginPath()
    ctx.arc(centroX, centroY, 20, 0, 2 * Math.PI); 
    ctx.fillStyle = '#f85149'; 
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function dibujarOrbita(radioVisual, numOrbita){
    ctx.beginPath()
    ctx.arc(centroX, centroY, radioVisual, 0, 2 * Math.PI); 
    if(numOrbita == orbitaHover){
        ctx.strokeStyle = '#30363d';
        ctx.lineWidth = 4;
    }else{
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#30363d';
    }
    
    ctx.stroke();
}

function dibujarElectron(radioVisual, angulo){
    let X = centroX + radioVisual * Math.cos(angulo);
    let Y = centroY + radioVisual * Math.sin(angulo); 
    ctx.beginPath()
    ctx.arc(X, Y, 13, 0, 2 * Math.PI); 
    ctx.fillStyle = '#58a6ff'; 
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarNucleo();

    for (let i = 1; i <= 7; i++) {
        let radioActual = 50 * i; 
        dibujarOrbita(radioActual, i);
        dibujarElectron(radioActual, anguloActual + i); 
    }
    anguloActual = anguloActual + 0.005;
    requestAnimationFrame(animar);
}

canvas.addEventListener('click', function(evento) {
    let rect = canvas.getBoundingClientRect();
    let clickX = evento.clientX - rect.left;
    let clickY = evento.clientY - rect.top;

    let diferenciaX = clickX - centroX;
    let diferenciaY = clickY - centroY;

    let distancia = (Math.sqrt(Math.pow(diferenciaX, 2) + Math.pow(diferenciaY, 2)))
    let n = Math.round(distancia/50); 
    if(n>=1 && n<=7){
        let radioFisico = calcularRadio(n);
        let velocidadFisica = calcularVelocidad(radioFisico, n);
        let frecuenciaFisica = calcularFrecuencia(velocidadFisica, radioFisico);
        let fuerzaFisica = calcularFuerza(radioFisico);
        let energiaFisica = calcularEnergia(velocidadFisica);

        document.getElementById('numOrbita').innerText = n;                
        document.getElementById('valRadio').innerText = radioFisico.toExponential(4);
        document.getElementById('valVelocidad').innerText = velocidadFisica.toExponential(4);
        document.getElementById('valFrecuencia').innerText = frecuenciaFisica.toExponential(4);
        document.getElementById('valFuerza').innerText = fuerzaFisica.toExponential(4);
        document.getElementById('valEnergia').innerText = energiaFisica.toExponential(4);
    } 
});

let orbitaHover = 0; 
canvas.addEventListener('mousemove', function(evento) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = evento.clientX - rect.left;
    let mouseY = evento.clientY - rect.top;
    let diferenciaX = mouseX - centroX;
    let diferenciaY = mouseY - centroY;
    let distancia = Math.sqrt(Math.pow(diferenciaX, 2) + Math.pow(diferenciaY, 2));
    let n = Math.round(distancia / 50);
    let radioExacto = n * 50;
    if (n >= 1 && n <= 7 && Math.abs(distancia - radioExacto) <= 10) {
        orbitaHover = n;
        canvas.style.cursor = 'pointer';
    } else {
        orbitaHover = 0;
        canvas.style.cursor = 'default';            }
});
animar();