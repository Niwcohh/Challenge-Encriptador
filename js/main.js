const textArea = document.querySelector(".input__texto");
const imagenMuneco = document.querySelector(".output__image");
const loaderInput = document.querySelector(".loader");
const loader2Input = document.querySelector(".loader2");
const outputTitle = document.querySelector(".output__title");
const outputText = document.querySelector(".output__text");

const botonEncriptar = document.querySelector(".btn__encriptar");
const botonDesencriptar = document.querySelector(".btn__desencriptar");
const botonCopiar = document.querySelector(".btn__copiar");


const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function encriptar(mensaje){
    let mensajeEncriptado = "";
    for(let i=0; i< mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++){
            if (letra === llaves[j][0]){
                encriptada = llaves[j][1];
            break;
            }
        }
        mensajeEncriptado += encriptada
    }
    return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    // Primero, procesamos las sustituciones en orden inverso
    for (let i = 0; i< llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

textArea.addEventListener("input", (e)=>{
    imagenMuneco.style.display = "none";
    loaderInput.classList.remove("hidden");
    outputTitle.textContent = "Capturando...";
    outputText.textContent = "";
})

botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase().trim(); // Trim para eliminar espacios en blanco
    if (mensaje === "") {
        outputText.textContent = "Por favor, ingresa un texto para encriptar.";
        botonCopiar.classList.add("hidden");
        loaderInput.classList.add("hidden");
        return;
    }
    let mensajeEncriptado = encriptar(mensaje);
    outputText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    outputTitle.textContent = "El Resultado es:";
    loaderInput.classList.add("hidden");
});

botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase().trim(); // Trim para eliminar espacios en blanco
    if (mensaje === "") {
        outputText.textContent = "Por favor, ingresa un texto para desencriptar.";
        botonCopiar.classList.add("hidden");
        loaderInput.classList.add("hidden");
        return;
    }
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    outputText.textContent = mensajeDesencriptado;
    outputTitle.textContent = "El Resultado es:";
    loaderInput.classList.add("hidden");
    botonCopiar.classList.remove("hidden");
});

botonCopiar.addEventListener('click', () => {
    let textoCopiado = outputText.textContent;
    if (textoCopiado === "") {
        return; // No hacer nada si no hay texto para copiar
    }
    navigator.clipboard.writeText(textoCopiado).then(() => {
        loaderInput.classList.add("hidden");
        outputTitle.textContent = "Texto copiado";
        botonCopiar.classList.add("hidden");
        outputText.textContent = "";
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
});