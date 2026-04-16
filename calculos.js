const r1 = 5.29e-11; 
const PI = Math.PI;
const e = -1.602e-19;
const m = 9.109e-31;
const h = 6.626e-34;
const epsilon = 8.854e-12;
const k = 8.987e9;  
 

// --- FUNCIONES DEL SIMULADOR ---
const calcularRadio = (n) => (r1)*(Math.pow(n, 2));
const calcularVelocidad = (radio, n) => (n * h) / (2 * PI * m * radio);
const calcularFrecuencia = (velocidad, radio) => velocidad / (2 * PI * radio);
const calcularFuerza = (radio) => (k) * (Math.pow(e, 2) / Math.pow(radio, 2));
const calcularEnergia = (velocidad) => (0.5 * m * Math.pow(velocidad, 2));