function mostrarMensaje(texto, clase) {
    const mensaje = document.querySelector("#mensaje")
    mensaje.textContent = texto
    mensaje.className = `mensaje ${clase}`
    mensaje.style.display = "block"
    setTimeout(() => {
        mensaje.style.display = "none"
    }, 3000)
}

// Escapa caracteres especiales para evitar inyección de HTML al mostrar datos en el DOM
function escaparHTML(texto) {
    const div = document.createElement("div")
    div.textContent = texto
    return div.innerHTML
}

// Valida formato básico de correo: algo@algo.algo
function esCorreoValido(correo) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return patron.test(correo)
}