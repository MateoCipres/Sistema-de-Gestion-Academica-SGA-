// Módulo Alumnos — SGA
// Usa guardarDatos/obtenerDatos de storage.js y mostrarMensaje/escaparHTML/esCorreoValido de ui.js

const formulario = document.querySelector("#formulario")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoId = null
let alumnoEditar = null

const botonVaciarFormulario = document.createElement("button")
botonVaciarFormulario.type = "button"
botonVaciarFormulario.id = "btnVaciarFormulario"
botonVaciarFormulario.textContent = "Vaciar formulario"
botonVaciarFormulario.className = "btn btn-secondary"
formulario.appendChild(botonVaciarFormulario)

function vaciarFormulario() {
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

    const alumnos = obtenerAlumnos()

    if (alumnoEditandoId === null) {
        const alumno = {
            id: Date.now(),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
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

        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo
        alumnoEditandoId = null
        alumnoEditar = null
        formulario.querySelector("button[type='submit']").textContent = "Guardar alumno"
        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }

    guardarDatos("alumnos", alumnos)
    mostrarAlumnos(alumnos)
    formulario.reset()
})

function obtenerAlumnos() {
    return obtenerDatos("alumnos")
}

function mostrarAlumnos(alumnos) {
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
    const alumnos = obtenerAlumnos()
    const alumnosActualizados = alumnos.filter(alumno => alumno.id !== id)
    guardarDatos("alumnos", alumnosActualizados)
    mostrarAlumnos(alumnosActualizados)

    // Si se borra el alumno que se estaba editando, hay que limpiar el formulario
    if (alumnoEditandoId === id) {
        vaciarFormulario()
    }

    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
}

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

// Mostrar los alumnos ya guardados al cargar la página
mostrarAlumnos(obtenerAlumnos())