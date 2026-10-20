// Referencias al formulario, a la tabla y a los controles que se actualizan durante una edición.
const formulario = document.querySelector("#formulario")
    // const mensaje = document.querySelector("#mensaje")
const listaAlumnos = document.querySelector("#listaAlumnos")
    // El legajo identifica al alumno que se está editando; los datos originales permiten detectar cambios.
let alumnoEditandoLegajo = null
let alumnoEditar = null
const btnCancelar = document.querySelector("#btnCancelar")
btnCancelar.style.display = "none"
const btnGuardar = document.querySelector("#btnGuardar")
    // URL base de la API; cada operación agrega la ruta o el método HTTP que necesita.
const API_ALUMNOS = "http://localhost:3000/alumnos"

// El envío del formulario decide entre crear y actualizar según exista una edición activa.
formulario.addEventListener("submit", async function(event) {
    // Evita la recarga tradicional para poder validar y enviar los datos con fetch.
    event.preventDefault();

    // Cargamos los valores de los campos del formulario
    const legajo = document.querySelector("#legajo").value.trim()
    const nombre = document.querySelector("#nombre").value.trim()
    const carrera = document.querySelector("#carrera").value.trim()
    const correo = document.querySelector("#correo").value.trim()

    // Rechaza datos incompletos antes de realizar una solicitud al servidor.
    if (legajo === "" || nombre === "" || carrera === "" || correo === "") {
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

    // Sin legajo en edición se crea un alumno; la API recibe el objeto como JSON.
    if (alumnoEditandoLegajo === null) {
        const alumno = {
            legajo: Number(legajo),
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        const respuesta = await fetch(API_ALUMNOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alumno)
        })
        if (!respuesta.ok) {
            mostrarMensaje("No se pudo guardar el alumno", "mje-error")
            return
        }
        mostrarMensaje("Alumno guardado correctamente", "mje-exito")
    } else {
        // Durante la edición el legajo queda fijo y solo se comparan/actualizan los otros campos.
        const datosActuales = {
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)) {
            mostrarMensaje("No se realizaron cambios", "mje-adv")
            return
        }
        // PUT actualiza los datos del alumno identificado por su legajo.
        const respuesta = await fetch(`${API_ALUMNOS}/${alumnoEditandoLegajo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                carrera: carrera,
                correo: correo
            })
        })
        if (!respuesta.ok) {
            mostrarMensaje("No se pudo actualizar el alumno", "mje-error")
            return
        }
        alumnoEditandoLegajo = null
        alumnoEditar = null
        btnGuardar.textContent = "Guardar Alumno"
        document.querySelector("#legajo").disabled = false

        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }
    // Vuelve a consultar la API para reflejar en la tabla el estado confirmado por el servidor.
    await actualizarListaAlumnos()
    formulario.reset()
});


// Consulta la colección completa y devuelve una lista vacía si el servidor informa un error HTTP.
async function obtenerAlumnos() {
    const respuesta = await fetch(API_ALUMNOS)
    if (!respuesta.ok) {
        mostrarMensaje("No se pudo obtener la lista de alumnos", "mje-error")
        return []
    }
    const alumnos = await respuesta.json()
    return alumnos
}

// Construye las filas de la tabla a partir de los objetos recibidos desde la API.
function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        // Los botones guardan el legajo en data-legajo para que el manejador delegue la acción correcta.
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.legajo}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button 
                class="btn-editar" 
                data-legajo="${alumno.legajo}"
                title="Editar alumno">
                <i class="fa-solid fa-pen"></i>
                </button>
                <button 
                class="btn-eliminar" 
                data-legajo="${alumno.legajo}"
                title="Eliminar alumno">
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

// Envía la baja a la API y limpia el formulario si se elimina justo el alumno que estaba en edición.
async function eliminarAlumno(legajo) {
    const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
        method: "DELETE"
    })
    if (!respuesta.ok) {
        mostrarMensaje("No se pudo eliminar el alumno", "mje-error")
        return
    }

    if (alumnoEditandoLegajo === legajo) {
        formulario.reset()
        alumnoEditar = null
        alumnoEditandoLegajo = null
        btnGuardar.textContent = "Guardar alumno"
        document.querySelector("#legajo").disabled = false
        btnCancelar.style.display = "none"
    }
    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
    await actualizarListaAlumnos()
}

// Mantiene sincronizados los datos del servidor y las filas visibles de la tabla.
async function actualizarListaAlumnos() {
    const alumnos = await obtenerAlumnos()
    mostrarAlumnos(alumnos)
}

// Un único listener en el tbody atiende también los botones creados dinámicamente al renderizar filas.
listaAlumnos.addEventListener("click", (e) => {
    const boton_el = e.target.closest(".btn-eliminar")
    if (boton_el) {
        const legajo = Number(boton_el.dataset.legajo)
        const confirmar = confirm("¿Está seguro de eliminar este alumno?")
        if (confirmar) {
            eliminarAlumno(legajo)
        }
    }
    const boton_ed = e.target.closest(".btn-editar")
    if (boton_ed) {
        const legajo = Number(boton_ed.dataset.legajo)
        editarAlumno(legajo)
    }
})

// Recupera el alumno desde la API y carga sus valores para que puedan modificarse.
async function editarAlumno(legajo) {
    const alumnos = await obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.legajo === legajo)

    if (!alumno) {
        mostrarMensaje("Alumno no encontrado", "mje-error")
        return
    }
    document.querySelector("#legajo").value = alumno.legajo;
    document.querySelector("#legajo").disabled = true;
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;

    alumnoEditar = {
        nombre: alumno.nombre,
        carrera: alumno.carrera,
        correo: alumno.correo
    }

    alumnoEditandoLegajo = alumno.legajo;
    btnCancelar.style.display = "inline-block"
    btnGuardar.textContent = "Actualizar Alumno"
    document.querySelector("#nombre").focus()
}

// Abandona la edición y restablece los controles al estado de alta de un alumno nuevo.
function cancelarEdicion() {
    formulario.reset()
    alumnoEditandoLegajo = null
    alumnoEditar = null
    btnGuardar.textContent = "Guardar Alumno"
    document.querySelector("#legajo").disabled = false
    btnCancelar.style.display = "none"
    document.querySelector("#legajo").focus()
}

btnCancelar.addEventListener("click", cancelarEdicion)

// Carga los alumnos al abrir la página y espera a que termine la consulta.
async function iniciar() {
    await actualizarListaAlumnos()
}

iniciar()