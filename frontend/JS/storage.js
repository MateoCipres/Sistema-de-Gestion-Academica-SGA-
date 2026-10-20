// Guarda arreglos u objetos en el almacenamiento del navegador, convirtiéndolos primero a texto JSON.
function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos))
}

// Recupera una colección guardada y la vuelve a convertir a datos JavaScript.
function obtenerDatos(clave) {
    const datos = localStorage.getItem(clave)
    if (datos) {
        return JSON.parse(datos)
    }
    // Una clave inexistente se interpreta como una colección vacía para simplificar el CRUD.
    return []
}