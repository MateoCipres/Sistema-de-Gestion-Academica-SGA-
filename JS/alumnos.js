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
const formulario = document.querySelector("#formAlumno")
const listaAlumnos = document.querySelector("#listaAlumnos")
let alumnoEditandoId = null


formulario.addEventListener("submit", function(event) {
    event.preventDefault();


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
        alumno.nombre = nombre
        alumno.carrera = carrera
        alumno.correo = correo
        alumnoEditandoId = null
        formulario.querySelector("button").textContent = "Guardar alumno"

        mostrarMensaje("alumnos actualizado correctamente", "mje-exito")
    }
    localStorage.setItem("alumnos", JSON.stringify(alumnos))


    mostrarAlumnos(alumnos)

    formulario.reset()
});

function obtenerAlumnos() {
    const datos = localStorage.getItem("alumnos")
    if (datos) {
        return JSON.parse(datos)
    }
    return []
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo
    setTimeout(() => {
        mensaje.textContent = " ";
        mensaje.className = "oculto";
    }, 3000);
}

const mensaje = document.querySelector("#mensaje")

function mostrarAlumnos(alumnos) {
    listaAlumnos.innerHTML = ""
    for (const alumno of alumnos) {
        listaAlumnos.innerHTML += `
        <tr>
            <td> ${alumno.id}</td>
            <td> ${alumno.nombre}</td>
            <td> ${alumno.carrera}</td>
            <td> ${alumno.correo}</td>
            <td> 
           <button class="btn-editar" data-id="${alumno.id}"> Editar</button>
           <button class="btn-eliminar" data-id="${alumno.id}"> Remover</button>
            </td>
        </tr>    
        `
    }
}

function eliminarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumnosActualizados = alumnos.filter(
        alumno => alumno.id !== id
    );
    localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados))
    mostrarAlumnos(alumnosActualizados)
    mostrarMensaje("alumno eliminado correctamente", "mje-exito")
}

listaAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = Number(e.target.dataset.id)
        eliminarAlumno(id)
    }
    if (e.target.classList.contains("btn-editar")) {
        const id = Number(e.target.dataset.id)
        editarAlumno(id)
    }
})


function editarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;
    alumnoEditandoId = id;
    formulario.querySelector("button").textContent = "Actualizar Alumno"

}

// Mostrar alumnos guardados al cargar la página
mostrarAlumnos(obtenerAlumnos())
mostrarAlumnos(alumnos)