// async function obtenerAlumnos() {
//     const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
//     const alumnos = await respuesta.json()
//     return alumnos
// }

// function mostrarAlumnos(alumnos) {
//     console.log(typeof alumnos)
//     localStorage.setItem("alumnos", JSON.stringify(alumnos))
//     const datos = localStorage.getItem("alumnos")
//     console.log(typeof datos)
//     console.log(datos)
//     const alumnosRecuperados = JSON.parse(datos)
//     console.log(typeof alumnosRecuperados)

//     console.table(alumnosRecuperados)
//     console.log(alumnosRecuperados[0].name)
//     for (const alumno of alumnosRecuperados) {
//         console.log(alumno.id, alumno.name, alumno.email)
//     }
// }

// obtenerAlumnos().then(alumnos => mostrarAlumnos(alumnos))


// async function iniciar() {
//     const alumnos = await obtenerAlumnos()
//     mostrarAlumnos(alumnos)
// }

// iniciar()

//traer de json del post el id  y body y comments  

// async function obtenerPosteos() {
//     const mostrar = await fetch("https://jsonplaceholder.typicode.com/posts")
//     const posts = await mostrar.json()
//     return posts
// }

// function mostrarPosteos(posts) {
//     console.table(posts)
//     for (const posteo of posts) {
//         console.log(posteo.id, posteo.body)
//     }
// }

// async function iniciar() {
//     const posts = await obtenerPosteos()
//     mostrarPosteos(posts)
// }
// iniciar()


//clase 06 formulario con alumnos
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

    if (!correo.includes("@")) {
        mostrarMensaje("Ingrese un correo electronico valido", "mje-error")
        return
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener como minimo 3 caracteres", "mje-error")
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

        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo

        const datosActuales = {
            nombre: nombre,
            carrera: carrera,
            correo: correo
        }
        if (datosActuales.nombre === alumnoEditar.nombre &&
            datosActuales.carrera === alumnoEditar.carrera &&
            datosActuales.correo === alumnoEditar.correo) {
            mostrarMensaje("no se realizaron cambios", "mje-advertencia")
            return
        }

        // if (JSON.stringify(datosActuales) === JSON.stringify(alumnoEditar)) {
        //     mostrarMensaje("no se realizaron cambios", "mje-error")
        //     return
        // }
        alumnoEditar = null
        alumnoEditandoId = null
        formulario.querySelector("button").textContent = "Guardar alumno"
        mostrarMensaje("Alumno actualizado correctamente", "mje-exito")
    }

    // localStorage.setItem("alumnos", JSON.stringify(alumnos))
    guardarDatos("alumnos", alumnos)
    mostrarAlumnos(alumnos)
    formulario.reset()
})

function obtenerAlumnos() {
    return obtenerDatos("alumnos")
}

function obtenerDatos(clave) {
    const datos = localStorage.getItem(clave)

    if (datos === null) {
        return []
    }

    try {
        const datosParseados = JSON.parse(datos)
        return Array.isArray(datosParseados) ? datosParseados : []
    } catch (error) {
        return []
    }
}

function guardarDatos(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos))
}

const mensaje = document.querySelector("#mensaje")

function mostrarMensaje(texto, clase) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${clase}`
    mensaje.style.display = "block"
    setTimeout(() => {
        mensaje.style.display = "none"
    }, 3000)
}

function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.carrera}</td>
            <td>${alumno.correo}</td>
            <td>
                <button class="btn-editar" data-id="${alumno.id}" title="editar alumno">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-eliminar" data-id="${alumno.id}" title="Eliminar alumno">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    }
}

function eliminarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumnosActualizados = alumnos.filter(alumno => alumno.id !== id)
    localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))
    mostrarAlumnos(alumnosActualizados)
    mostrarMensaje("Alumno eliminado correctamente", "mje-exito")
}

listaAlumnos.addEventListener("click", (e) => {
    const botonEliminar = e.target.closest(".btn-eliminar")
    if (botonEliminar) {
        const id = Number(botonEliminar.dataset.id)
        const confirmar = confirm("Estas seguro de eliminar al alumno?")
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
    alumnoEditandoId = id
    formulario.querySelector("button").textContent = "Actualizar Alumno"
    document.querySelector("#nombre").focus()
}

mostrarAlumnos(obtenerAlumnos())