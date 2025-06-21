let model;
const classes = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't'];

async function cargarModelo() {
    model = await tf.loadGraphModel('modelo_tfjs_letras/model.json');
    console.log("Modelo de letras cargado");
}

cargarModelo();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let pintando = false;

canvas.addEventListener('mousedown', (e) => {
    pintando = true;
    dibujar(e);
});
canvas.addEventListener('mouseup', () => {
    pintando = false;
    ctx.beginPath();
});
canvas.addEventListener('mousemove', dibujar);

function dibujar(e) {
    if (!pintando) return;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function limpiarCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById('resultado').innerText = "Predicción: ";
}

async function predecir() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let tensor = tf.browser.fromPixels(imgData, 1)
        .resizeNearestNeighbor([28, 28])
        .toFloat()
        .div(255.0)
        .reshape([1, 28, 28, 1]);

    const pred = await model.executeAsync(tensor);
    const prediccion = pred.arraySync()[0];
    const claseIndex = prediccion.indexOf(Math.max(...prediccion));
    let letra = 'Desconocido';

    if (claseIndex >= 0 && claseIndex < classes.length) {
         letra = classes[claseIndex];
         if (claseIndex === 0) {
             letra = 'N/A o Clase 0';
         }
    } else {
        console.warn(`Índice de clase fuera de rango: ${claseIndex}`);
    }

    document.getElementById('resultado').innerText = "Predicción: " + letra;
    tensor.dispose();
    pred.dispose();
}
