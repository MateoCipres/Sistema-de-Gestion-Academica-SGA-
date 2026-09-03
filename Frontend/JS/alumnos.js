// Módulo Alumnos - SGA.
// Usa storage.js para persistencia local y ui.js para mensajes, seguridad y validación.
// La clave "alumnos" separa estos datos de los docentes dentro de localStorage.

// Obtiene referencias al formulario y a la tabla que se actualizará en el DOM.
const formulario = document.querySelector("#formulario")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoId = null
let alumnoEditar = null

// Crea un botón adicional para limpiar el formulario sin recargar la página.
const botonVaciarFormulario = document.createElement("button")
botonVaciarFormulario.type = "button"
botonVaciarFormulario.id = "btnVaciarFormulario"
botonVaciarFormulario.textContent = "Vaciar formulario"
botonVaciarFormulario.className = "btn btn-secondary"
formulario.appendChild(botonVaciarFormulario)

function vaciarFormulario() {
    // Restablece los campos y termina cualquier modo de edición activo.
    formulario.reset()
    alumnoEditandoId = null
    alumnoEditar = null
    const botonSubmit = formulario.querySelector("button[type='submit']")
    if (botonSubmit) {
        botonSubmit.textContent = "Guardar alumno"
    }
}

botonVaciarFormulario.addEventListener("click", () => {
    vaciarFormulario()
    mostrarMensaje("Formulario vaciado", "mje-exito")
    document.querySelector("#nombre").focus()
})

formulario.addEventListener("submit", function(event) {
    // Evita el envío tradicional y valida los datos antes de guardarlos.
    event.preventDefault()

    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || carrera === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener como minimo 3 caracteres", "mje-error")
        return
    }

    if (carrera.length < 3) {
        mostrarMensaje("La carrera debe tener como minimo 3 caracteres", "mje-error")
        return
    }

    if (!esCorreoValido(correo)) {
        mostrarMensaje("Ingrese un correo electronico valido", "mje-error")
        return
    }

    // Se recupera la lista persistida; si no existe, obtenerDatos devuelve [].
    // Luego se decide entre alta o actualización según alumnoEditandoId.
    const alumnos = obtenerAlumnos()

    if (alumnoEditandoId === null) {
        const alumno = {
                id: Date.now(),
                nombre: nombre,
                carrera: carrera,
                correo: correo
            }
            // push agrega el nuevo objeto a la lista que luego se vuelve a guardar.
        alumnos.push(alumno)
        mostrarMensaje("Alumno guardado correctamente", "mje-exito")
    } else {
        const alumno = alumnos.find(alumno => alumno.id === alumnoEditandoId)
        if (!alumno) {
            mostrarMensaje("No se encontró el alumno a actualizar", "mje-error")
            return
        }

        const datosActuales = { nombre, carrera, correo }
        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)) {
            mostrarMensaje("No se realizaron cambios", "mje-advertencia")
            return
        }

        // La lista recuperada es modificada en memoria y después se persiste completa.
        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo
        alumnoEditandoId = null
        alumnoEditar = null
        formulario.querySelector("button[type='submit']").textContent = "Guardar alumno"
        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }

    // Sobrescribe la clave "alumnos" con la lista actualizada en formato JSON.
    guardarDatos("alumnos", alumnos)
    mostrarAlumnos(alumnos)
    formulario.reset()
})

function obtenerAlumnos() {
    // Lee la clave "alumnos" mediante la función común de storage.js.
    return obtenerDatos("alumnos")
}

function mostrarAlumnos(alumnos) {
    // Convierte cada alumno en una fila HTML y la inserta en la tabla.
    const filas = alumnos.map(alumno => `
        <tr>
            <td>${alumno.id}</td>
            <td>${escaparHTML(alumno.nombre)}</td>
            <td>${escaparHTML(alumno.carrera)}</td>
            <td>${escaparHTML(alumno.correo)}</td>
            <td>
                <button class="btn-editar" data-id="${alumno.id}" title="Editar alumno">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-eliminar" data-id="${alumno.id}" title="Eliminar alumno">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `)

    listaAlumnos.innerHTML = filas.join("")
}

function eliminarAlumno(id) {
    // Lee la lista persistida y filter crea otra lista sin el ID seleccionado.
    const alumnos = obtenerAlumnos()
    const alumnosActualizados = alumnos.filter(alumno => alumno.id !== id)
        // Reemplaza en localStorage la lista anterior por la lista filtrada.
    guardarDatos("alumnos", alumnosActualizados)
    mostrarAlumnos(alumnosActualizados)

    // Si se borra el alumno que se estaba editando, hay que limpiar el formulario
    if (alumnoEditandoId === id) {
        vaciarFormulario()
    }

    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
}

// Un solo listener en la tabla detecta los clics de editar o eliminar mediante delegación.
listaAlumnos.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar")
    if (botonEliminar) {
        const id = Number(botonEliminar.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar al alumno?")
        if (confirmar) {
            eliminarAlumno(id)
        }
        return
    }

    const botonEditar = e.target.closest(".btn-editar")
    if (botonEditar) {
        const id = Number(botonEditar.dataset.id)
        editarAlumno(id)
    }
})

function editarAlumno(id) {
    // Obtiene nuevamente la lista guardada y busca dentro de ella el ID elegido.
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)

    if (!alumno) {
        mostrarMensaje("No se encontró el alumno", "mje-error")
        return
    }

    document.querySelector("#nombre").value = alumno.nombre
    document.querySelector("#carrera").value = alumno.carrera
    document.querySelector("#correo").value = alumno.correo

    alumnoEditar = {
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }
    alumnoEditandoId = id
    formulario.querySelector("button[type='submit']").textContent = "Actualizar alumno"
    document.querySelector("#nombre").focus()
}

// Renderiza los alumnos existentes apenas termina de cargar el script.
mostrarAlumnos(obtenerAlumnos())