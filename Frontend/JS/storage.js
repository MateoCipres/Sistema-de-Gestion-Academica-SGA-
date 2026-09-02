// Guarda un arreglo u objeto convirtiéndolo a texto JSON para usar localStorage.
function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos))
}

// Recupera datos guardados, los convierte nuevamente desde JSON y devuelve []
// cuando todavía no existe información para la clave solicitada.
function obtenerDatos(clave) {
    const datos = localStorage.getItem(clave)
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}