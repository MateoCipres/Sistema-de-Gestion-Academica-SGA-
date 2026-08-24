// Módulo Docentes — SGA
// Autónomo: no depende de alumnos.js porque vive en su propia página (docentes.html)

const formularioDocente = document.querySelector("#formDocente")
const listaDocentes = document.querySelector("#listaDocentes")
const mensaje = document.querySelector("#mensaje")
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

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto
    mensaje.className = tipo
    setTimeout(() => {
        mensaje.textContent = " "
        mensaje.className = "oculto"
    }, 3000)
}

formularioDocente.addEventListener("submit", function(event) {
    event.preventDefault()

    const nombre = document.querySelector("#nombre").value.trim()
    const especialidad = document.querySelector("#especialidad").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || especialidad === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electronico valido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener como minimo 3 caracteres", "mje-error")
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

    localStorage.setItem("docentes", JSON.stringify(docentes))
    mostrarDocentes(docentes)
    formularioDocente.reset()
})

function obtenerDocentes() {
    const datos = localStorage.getItem("docentes")
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}

function mostrarDocentes(docentes) {
    listaDocentes.innerHTML = ""
    for (const docente of docentes) {
        listaDocentes.innerHTML += `
        <tr>
            <td>${docente.id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.especialidad}</td>
            <td>${docente.correo}</td>
            <td>
                <button class="btn-editar" data-id="${docente.id}" title="Editar docente">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-eliminar" data-id="${docente.id}" title="Eliminar docente">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }
}

function eliminarDocente(id) {
    const docentes = obtenerDocentes()
    const docentesActualizados = docentes.filter(docente => docente.id !== id)
    localStorage.setItem("docentes", JSON.stringify(docentesActualizados))
    mostrarDocentes(docentesActualizados)
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