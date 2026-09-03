// localStorage pertenece al navegador y conserva la información aunque se cierre
// o se recargue la página. Solo almacena texto, por eso los arreglos y objetos
// deben convertirse a JSON antes de guardarse.
function guardarDatos(clave, datos) {
    // La clave identifica el grupo de datos y JSON.stringify serializa la lista.
    localStorage.setItem(clave, JSON.stringify(datos))
}

// Recupera datos guardados, los convierte nuevamente desde JSON y devuelve una
// lista vacía cuando todavía no existe información para la clave solicitada.
function obtenerDatos(clave) {
    // getItem devuelve el texto guardado o null si la clave no existe.
    const datos = localStorage.getItem(clave)
    if (datos) {
        // JSON.parse transforma el texto JSON en un arreglo utilizable por JavaScript.
        return JSON.parse(datos)
    }
    // Así los módulos pueden usar métodos como push, find y filter desde el inicio.
    return []
}