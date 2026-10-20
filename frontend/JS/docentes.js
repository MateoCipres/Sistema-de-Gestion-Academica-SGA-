// Elementos de la página y estado que identifica si el formulario está creando o editando.
const formulario = document.querySelector("#formDocente")
const mensaje = document.querySelector("#mensajeDocente")
const listaDocentes = document.querySelector("#listaDocentes")
let docenteEditandoId = null

// El formulario valida y guarda docentes localmente; no realiza solicitudes al backend.
formulario.addEventListener("submit", function(event) {
    // Evita que el navegador recargue la página al enviar el formulario.
    event.preventDefault();

    const nombre = document.querySelector("#nombreDocente").value.trim()
    const especialidad = document.querySelector("#especialidad").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    if (nombre === "" || especialidad === "" || correo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "mje-error")
        return
    }

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electrónico válido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error")
        return
    }

    // Se modifica una copia recuperada de localStorage y luego se persiste la lista completa.
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
        docente.nombre = nombre
        docente.especialidad = especialidad
        docente.correo = correo
        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar Docente"

        mostrarMensaje("Docente actualizado correctamente", "mje-exito")
    }
    // La utilidad compartida serializa los datos y los guarda con la clave "docentes".
    guardarDatos("docentes", docentes)
    mostraDocentes(docentes)
    formulario.reset()
});


// Usa la utilidad compartida para leer la lista persistida en el navegador.
function obtenerDocentes() {
    return obtenerDatos("docentes")
}


// Vacía y vuelve a construir las filas para que la tabla represente la lista actual.
function mostraDocentes(docentes) {
    listaDocentes.innerHTML = ""
    for (const docente of docentes) {
        listaDocentes.innerHTML += `
        <tr>
            <td>${docente.id}</td>
            <td>${docente.nombre}</td>
            <td>${docente.especialidad}</td>
            <td>${docente.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-id="${docente.id}"
                title="Editar docente">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-id="${docente.id}"
                title="Eliminar docente">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

// Elimina el docente indicado creando una lista filtrada y guardándola en localStorage.
function eliminarDocente(id) {
    const docentes = obtenerDocentes()
    const docentesActualizados = docentes.filter(
        docente => docente.id !== id
    );
    localStorage.setItem("docentes", JSON.stringify(docentesActualizados))
    mostraDocentes(docentesActualizados)
    if (docenteEditandoId === id) {
        formulario.reset()
        docenteEditandoId = null
        formulario.querySelector("button").textContent = "Guardar docente"
    }
    mostrarMensaje("Docente eliminado correctamente", "mje-exito")
}

// La delegación de eventos permite manejar los botones de cada fila desde un solo listener.
listaDocentes.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")
    if (boton_el) {
        const id = Number(boton_el.dataset.id)
        const confirmar = confirm("¿Está seguro de eliminar este docente?")
        if (confirmar) {
            eliminarDocente(id)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const id = Number(boton_ed.dataset.id)
        editarDocente(id)
    }
})

// Busca el registro seleccionado y completa el formulario para editarlo.
function editarDocente(id) {
    const docentes = obtenerDocentes()
    const docente = docentes.find(docente => docente.id === id)
    document.querySelector("#nombre").value = docente.nombre;
    document.querySelector("#especialidad").value = docente.especialidad;
    document.querySelector("#correo").value = docente.correo;
    docenteEditandoId = id;
    formulario.querySelector("button").textContent = "Actualizar Docente"
    document.querySelector("#nombre").focus()
}

// Render inicial: muestra los datos persistidos apenas se carga el script.
const docentes = obtenerDocentes()
mostraDocentes(docentes)