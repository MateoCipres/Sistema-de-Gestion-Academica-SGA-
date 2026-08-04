console.log("Inicio")
setTimeout(() => {
    console.log("Buscando alumnos...")
}, 3000)

console.log("Fin")

function saludar() {
    console.log("Hola")
}

function ejecutar(funcion) {
    funcion();
}

ejecutar(saludar)

function despedirse() {
    console.log("Hasta luego")
}
setTimeout(despedirse, 3000)

setTimeout(() => {
    console.log("Buscando docentes...")
}, 6000);

setTimeout(() => {
    console.log("Buscando materias...")
}, 2000);

setTimeout(() => {
    console.log("Buscando cursos...")
}, 1000);

console.log("Abriendo SGA")

setTimeout(() => {
    console.log("Alumnos cargados")
}, 3000);

console.log("todos los alumnos estan cargados")