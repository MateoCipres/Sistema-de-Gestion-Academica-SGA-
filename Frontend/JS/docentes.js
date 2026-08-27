// Módulo Docentes — SGA
// Usa guardarDatos/obtenerDatos de storage.js y mostrarMensaje/escaparHTML/esCorreoValido de ui.js

const formularioDocente = document.querySelector("#formDocente")
const listaDocentes = document.querySelector("#listaDocentes")
let docenteEditandoId = null

const botonVaciarFormulario = document.createElement("button")
botonVaciarFormulario.type = "button"
botonVaciarFormulario.id = "btnVaciarFormulario"
botonVaciarFormulario.textContent = "Vaciar formulario"
botonVaciarFormulario.className = "btn btn-secondary"
formularioDocente.appendChild(botonVaciarFormulario)

function vaciarFormulario() {
    formularioDocente.reset()
    docenteEditandoId = null
    const botonSubmit = formularioDocente.querySelector("button[type='submit']")
    if (botonSubmit) {
        botonSubmit.textContent = "Confirmar Docente"
    }
}

botonVaciarFormulario.addEventListener("click", () => {
    vaciarFormulario()
    mostrarMensaje("Formulario vaciado", "mje-exito")
    document.querySelector("#nombre").focus()
})

formularioDocente.addEventListener("submit", function(event) {
    event.preventDefault()

    const nombre = document.querySelector("#nombre").value.trim()
    const especialidad = document.querySelector("#especialidad").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || especialidad === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener como minimo 3 caracteres", "mje-error")
        return
    }

    if (especialidad.length < 3) {
        mostrarMensaje("La especialidad debe tener como minimo 3 caracteres", "mje-error")
        return
    }

    if (!esCorreoValido(correo)) {
        mostrarMensaje("Ingrese un correo electronico valido", "mje-error")
        return
    }

    const docentes = obtenerDocentes()

    if (docenteEditandoId === null) {
        const docente = {
            id: Date.now(),
            nombre: nombre,
            especialidad: especialidad,
            correo: correo
        }
        docentes.push(docente)
        mostrarMensaje("Docente guardado correctamente", "mje-exito")
    } else {
        const docente = docentes.find(docente => docente.id === docenteEditandoId)
        if (!docente) {
            mostrarMensaje("No se encontró el docente a actualizar", "mje-error")
            return
        }

        docente.nombre = nombre
        docente.especialidad = especialidad
        docente.correo = correo
        docenteEditandoId = null
        formularioDocente.querySelector("button[type='submit']").textContent = "Confirmar Docente"
        mostrarMensaje("Docente actualizado correctamente", "mje-exito")
    }

    guardarDatos("docentes", docentes)
    mostrarDocentes(docentes)
    formularioDocente.reset()
})

function obtenerDocentes() {
    return obtenerDatos("docentes")
}

function mostrarDocentes(docentes) {
    const filas = docentes.map(docente => `
        <tr>
            <td>${docente.id}</td>
            <td>${escaparHTML(docente.nombre)}</td>
            <td>${escaparHTML(docente.especialidad)}</td>
            <td>${escaparHTML(docente.correo)}</td>
            <td>
                <button class="btn-editar" data-id="${docente.id}" title="Editar docente">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-eliminar" data-id="${docente.id}" title="Eliminar docente">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `)

    listaDocentes.innerHTML = filas.join("")
}

function eliminarDocente(id) {
    const docentes = obtenerDocentes()
    const docentesActualizados = docentes.filter(docente => docente.id !== id)
    guardarDatos("docentes", docentesActualizados)
    mostrarDocentes(docentesActualizados)

    // Si se borra el docente que se estaba editando, hay que limpiar el formulario
    if (docenteEditandoId === id) {
        vaciarFormulario()
    }

    mostrarMensaje("Docente eliminado correctamente", "mje-exito")
}

listaDocentes.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar")
    if (botonEliminar) {
        const id = Number(botonEliminar.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar este docente?")
        if (confirmar) {
            eliminarDocente(id)
        }
        return
    }

    const botonEditar = e.target.closest(".btn-editar")
    if (botonEditar) {
        const id = Number(botonEditar.dataset.id)
        editarDocente(id)
    }
})

function editarDocente(id) {
    const docentes = obtenerDocentes()
    const docente = docentes.find(docente => docente.id === id)

    if (!docente) {
        mostrarMensaje("No se encontró el docente", "mje-error")
        return
    }

    document.querySelector("#nombre").value = docente.nombre
    document.querySelector("#especialidad").value = docente.especialidad
    document.querySelector("#correo").value = docente.correo
    docenteEditandoId = id
    formularioDocente.querySelector("button[type='submit']").textContent = "Actualizar docente"
    document.querySelector("#nombre").focus()
}

// Mostrar los docentes ya guardados al cargar la página
mostrarDocentes(obtenerDocentes())