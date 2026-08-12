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
let alumnoeditado
formulario.addEventListener("submit", function(event) {
    event.preventDefault();


    const nombre = document.querySelector("#nombre").value
    const carrera = document.querySelector("#carrera").value
    const correo = document.querySelector("#correo").value

    const alumno = {
        id: Date.now(),
        nombre: nombre,
        carrera: carrera,
        correo: correo
    }
    const alumnos = obtenerAlumnos()
    alumnos.push(alumno)

    localStorage.setItem("alumnos", JSON.stringify(alumnos))

    mostrarMensaje("Alumno guardado correctamente")

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

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = " ";
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
    mostrarMensaje("alumno eliminado correctamente")
}

listaAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = Number(e.target.dataset.id)
        eliminarAlumno(id)
    }
})


function editarAlumno(id) {
    const alumnos = obtenerAlumnos()
    const alumno = alumnos.find(alumno => alumno.id === id)
    document.querySelector("#nombre").value = alumno.nombre;
    document.querySelector("#carrera").value = alumno.carrera;
    document.querySelector("#correo").value = alumno.correo;
    alumnoeditadoId

}

// Mostrar alumnos guardados al cargar la página
mostrarAlumnos(obtenerAlumnos())