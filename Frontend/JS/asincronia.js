// // console.log("Inicio")
// // setTimeout(() => {
// //     console.log("Buscando alumnos...")
// // }, 3000)

// // console.log("Fin")

// // function saludar() {
// //     console.log("Hola")
// // }

// // function ejecutar(funcion) {
// //     funcion();
// // }

// // ejecutar(saludar)

// // function despedirse() {
// //     console.log("Hasta luego")
// // }
// // setTimeout(despedirse, 3000)

// // setTimeout(() => {
// //     console.log("Buscando docentes...")
// // }, 6000);

// // setTimeout(() => {
// //     console.log("Buscando materias...")
// // }, 2000);

// // setTimeout(() => {
// //     console.log("Buscando cursos...")
// // }, 1000);

// // console.log("Abriendo SGA")

// // setTimeout(() => {
// //     console.log("Alumnos cargados")
// // }, 3000);

// // console.log("todos los alumnos estan cargados")

// // En 5 segundos de espera tiene que aparecer "lista recibida"
// // Solicitando lista de alumnos va primero...
// // "Mientras tanto el programa sigue ejecutandose"

// // setTimeout(() => {
// //     console.log("lista recibida")
// // }, 5000);

// // console.log("Solicitando lista de alumnos...")

// // console.log("El programa sigue ejecutandose")

// // function obtenerAlumnos() {
// //     console.log("Ya tengo el arreglo")
// //     return new Promise((resolve) => {
// //         setTimeout(() => {
// //             resolve(["Ana", "Laura", "Maria"])
// //         }, 3000);
// //     })
// // }

// // // obtenerAlumnos().then((alumnos) => {
// // //     console.log(alumnos)
// // // })

// // async function iniciar() {
// //     const alumnos = await obtenerAlumnos()
// //     console.log(alumnos)
// // }
// // iniciar()

// function obtenerClima() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("22°C - Soleado");
//         }, 2000);
//     });
// }

// //con Then
// obtenerClima().then((clima) => {
//     console.log(clima)
// });

// async function mostrarClima() {
//     const clima = await obtenerClima()
//     console.log(clima)
// }

// mostrarClima()

// function consultarSaldo() {
//     return new Promise((resolve))
//     setTimeout(() => {
//         resolve(125000)
//     }, 3000);
// }

// function iniciarSesion() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Bienvenidos Mateo")
//         }, 2000);
//     })

// }
// async function iniciarSesion() {
//     const mensaje = await iniciando()
//     console.log(mensaje)
// }

async function prueba() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
    console.log(respuesta)
}