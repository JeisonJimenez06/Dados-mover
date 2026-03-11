const die = document.getElementById('die1');
const sound = document.getElementById('dice-sound');
let lastUpdate = 0;
let lastX, lastY, lastZ;
const threshold = 15; // Sensibilidad del agitado

// Función para lanzar dados
function rollDice() {
    // Añadir animación
    die.classList.add('shaking');
    sound.play();

    setTimeout(() => {
        const result = Math.floor(Math.random() * 6) + 1;
        die.className = `bi bi-dice-${result} dice`;
        die.classList.remove('shaking');
    }, 600);
}

// Detectar movimiento
window.addEventListener('devicemotion', (event) => {
    let acceleration = event.accelerationIncludingGravity;
    let curTime = new Date().getTime();

    if ((curTime - lastUpdate) > 100) {
        let diffTime = curTime - lastUpdate;
        lastUpdate = curTime;

        let speed = Math.abs(acceleration.x + acceleration.y + acceleration.z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > threshold) {
            rollDice();
        }
        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
    }
});

// También permitir clic (por si el navegador bloquea sensores)
die.addEventListener('click', rollDice);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Service Worker registrado', reg))
      .catch(err => console.error('Error al registrar SW', err));
  });
}