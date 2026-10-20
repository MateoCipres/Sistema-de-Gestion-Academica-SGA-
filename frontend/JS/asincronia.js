// Ejercicio desactivado: muestra que setTimeout agenda una tarea y el resto del código sigue ejecutándose.
// console.log("Inicio")
// setTimeout(() => {
//     console.log("Buscando alumnos...")
// }, 3000)
// console.log("Fin")

// Ejercicio desactivado: una función puede recibirse como argumento y ejecutarse como callback.
// function saludar(){
//     console.log("Hola")
// }
// function ejecutar(funcion){
//     funcion();
// }
// ejecutar(saludar)

// function despedirse(){
//     console.log("Hasta luego")
// }
// setTimeout(despedirse, 3000)

// Ejercicio desactivado: varios temporizadores pueden finalizar en un orden distinto al que fueron declarados.
// setTimeout(() => {
//     console.log("Buscando docentes...")
// }, 2000);

// setTimeout(() => {
//     console.log("Buscando materias...")
// }, 4000);

// setTimeout(() => {
//     console.log("Buscando cursos...")
// }, 1000);

// console.log("Abriendo SGA")
// setTimeout(() => {
//     console.log("Alumnos cargados")
// }, 3000);

// console.log("El usuario puede seguir navegando")

// Ejercicio desactivado: una Promise representa un resultado que estará disponible más adelante.
// function obtenerAlumnos(){
//    return new Promise((resolve) => {
//     setTimeout(() => {
//         console.log("Ya tengo el arreglo")
//         resolve(["Ana", "Juan", "Pedro"])
//     }, 3000);
//    })
// }
// obtenerAlumnos().then((alumnos) => {
//     console.log(alumnos)
// })

// // async function iniciar() {
// //     const alumnos = await obtenerAlumnos()
// //     console.log(alumnos)
// // } 
// // iniciar()

// Ejercicio desactivado: encadena consultas dependientes y captura errores al final con catch.
// // login(usuario).then((usuario) => {
// //     return obtenerCursos(usuario.id)
// // })
// // .then((cursos) => {
// //     return obtenerNotas(cursos)
// // })
// // .then((notas) => {
// //     console.log(notas)
// // })
// // .catch((error) => {
// //     console.log(error)
// // })

// // async function mostrarNotas(){
// //     try {
// //     const usuario = await login(usuario)
// //     const cursos = await obtnerCursos(usuario.id)
// //     const notas = await obtenerNotas(cursos)
// //     console.log(notas)
// //     }
// //     catch(error) {
// //         console.log()
// //     }
// // }

// Ejercicio desactivado: la misma Promise puede consumirse con then o con async/await.
// function obtenerClima() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("22°c - Soleado")
//         }, 2000)
//     })
// }

// // con then()
// obtenerClima().then((clima) => {
//     console.log(clima)
// });

// // con async/await
// async function mostrarClima() {
//     const clima = await obtenerClima()
//     console.log(clima)
// }

// mostrarClima()

// Ejercicio desactivado: ejemplos breves de async/await para esperar resultados simulados.
// function consultarSaldo() {
//     return new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(125000)
//     }, 3000);
// });
// }

// async function mostrarSaldo(){
//     const saldo = await consultarSaldo()
//     console.log(`Su saldo es: $${saldo}`)
// }
// mostrarSaldo()

// function iniciarSesion() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Bienvenida, Irina")
//         }, 2000)
//     })
// }
// async function mostrarInicio() {
//     const mensaje = await iniciarSesion()
//     console.log(mensaje)
// }
// mostrarInicio()

// function obtenerUsuario(){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 id: 1,
//                 nombre: "Maria",
//                 edad: 25
//             })
//         }, 3000);
//     })
// }
// async function mostrarUsuario(){
//     console.log("Consultando usuario...")
//     const usuario = await obtenerUsuario()
//     console.log(usuario)
// }
// mostrarUsuario()

// Ejemplo activo: consulta una API pública y muestra el objeto Response que devuelve fetch.
async function prueba() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
    console.log(respuesta)
}
prueba()

// Ejercicio desactivado: datos simulados para practicar una consulta asíncrona sin servidor.
// Parte inicial de alumnos.js

// const alumnos = [
//     {
//         id: 1,
//         nombre: "Ana"
//     },
//     {
//         id: 2,
//         nombre: "José"
//     }
// ];
// function obtenerAlumnos(){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(alumnos)
//         }, 2000);
//     })
// }

// Ejercicio desactivado: ideas para obtener diferentes colecciones y mostrarlas con async/await.
// crear obtenerMaterias()
// crear obtenerDocentes()
// mostrar los datos a través de async/await

// Ejercicio desactivado: fetch obtiene datos HTTP y response.json convierte el cuerpo JSON a objetos.
// async function obtenerAlumnos() {
//     const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")
//     const alumnos = await respuesta.json()
//     return alumnos
// }

// function mostrarAlumnos(alumnos){
// //    console.table(alumnos)
// console.log(typeof alumnos)
// localStorage.setItem("alumnos", JSON.stringify(alumnos))
// const datos = localStorage.getItem("alumnos")
// console.log(typeof datos)
// console.log(datos)
// const alumnosRecuperados = JSON.parse(datos)
// console.log(typeof alumnosRecuperados)
// console.table(alumnosRecuperados)

// //    console.log(alumnos[5])
// // for (const alumno of alumnos){
// //     console.log(alumno.id, alumno.name, alumno.email)
// // }
// }

// async function inciar(){
//     const alumnos = await obtenerAlumnos()  
//     mostrarAlumnos(alumnos)
// }

// inciar()