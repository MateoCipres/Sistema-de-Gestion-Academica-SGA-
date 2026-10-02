// Muestra un aviso reutilizable; la clase recibida determina su aspecto (éxito, error, etc.).
function mostrarMensaje(texto, clase) {
    const mensaje = document.querySelector("#mensaje")
        // textContent inserta el mensaje como texto y evita que se interprete como HTML.
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${clase}`
    mensaje.style.display = "block"
        // Oculta el aviso después de tres segundos sin bloquear la interacción con la página.
    setTimeout(() => {
        mensaje.style.display = "none"
    }, 3000);
}