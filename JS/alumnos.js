async function obtenerAlumnos() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
    const alumnos = await respuesta.json()
    return alumnos
}

function mostrarAlumnos(alumnos) {
    console.log(typeof alumnos)
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
    const datos = localStorage.getItem("alumnos")
    console.log(typeof datos)
    console.log(datos)
    const alumnosRecuperados = JSON.parse(datos)
    console.log(typeof alumnosRecuperados)

    console.table(alumnosRecuperados)
    console.log(alumnosRecuperados[0].name)
    for (const alumno of alumnosRecuperados) {
        console.log(alumno.id, alumno.name, alumno.email)
    }
}

obtenerAlumnos().then(alumnos => mostrarAlumnos(alumnos))


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