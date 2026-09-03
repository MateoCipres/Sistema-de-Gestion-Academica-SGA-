const fs = require("fs")
const path = require("path")

const output = path.join(__dirname, "GUIA_SGA.pdf")
const pageWidth = 595
const pageHeight = 842
const margin = 54
const contentWidth = pageWidth - margin * 2
const fontSize = 10
const lineHeight = 14
const maxLines = 51

const sections = [
    { type: "title", text: "Guia de estudio - Sistema de Gestion Academica" },
    { type: "subtitle", text: "Proyecto de Programacion IV" },
    { type: "para", text: "Este documento explica como esta organizado el proyecto SGA, que hace cada archivo, como viajan los datos y que diferencias existen entre el frontend actual y el backend en desarrollo." },
    { type: "heading", text: "1. Vista general" },
    { type: "para", text: "El sistema es una aplicacion web para administrar alumnos y docentes. La portada permite entrar a cada modulo. El modulo de alumnos permite alta, consulta, edicion y baja. El modulo de docentes ofrece las mismas operaciones con el campo especialidad." },
    { type: "para", text: "El frontend funciona actualmente sin depender del servidor: guarda los datos en localStorage, que pertenece al navegador. El backend es una API Express separada que, por ahora, guarda alumnos en un arreglo de memoria." },
    { type: "heading", text: "2. Estructura del proyecto" },
    { type: "code", text: "SGA/" },
    { type: "code", text: "  Frontend/       Paginas, estilos y logica del navegador" },
    { type: "code", text: "    index.html    Portada y accesos a los modulos" },
    { type: "code", text: "    alumnos.html  Formulario y tabla de alumnos" },
    { type: "code", text: "    docentes.html Formulario y tabla de docentes" },
    { type: "code", text: "    CSS/estilos.css Estilos compartidos" },
    { type: "code", text: "    JS/storage.js Utilidades de localStorage" },
    { type: "code", text: "    JS/ui.js      Mensajes, escape HTML y correo" },
    { type: "code", text: "    JS/alumnos.js Logica CRUD de alumnos" },
    { type: "code", text: "    JS/docentes.js Logica CRUD de docentes" },
    { type: "code", text: "    JS/asincronia.js Ejercicios de Promises y fetch" },
    { type: "code", text: "  Backend/        API REST con Node.js y Express" },
    { type: "code", text: "    server.js     Arranque de Express" },
    { type: "code", text: "    routes/       URLs y metodos HTTP" },
    { type: "code", text: "    controllers/  Funciones que responden solicitudes" },
    { type: "code", text: "    data/         Arreglo que simula una base de datos" },
    { type: "heading", text: "3. Como se carga una pagina" },
    { type: "para", text: "Cada HTML define la estructura visual y carga estilos.css. En alumnos.html y docentes.html los scripts tienen defer: el navegador descarga los archivos y espera a que el HTML este disponible antes de ejecutarlos." },
    { type: "para", text: "El orden declarado es importante. storage.js define guardarDatos y obtenerDatos; ui.js define mostrarMensaje, escaparHTML y esCorreoValido; por ultimo alumnos.js o docentes.js utiliza esas funciones compartidas." },
    { type: "code", text: "storage.js -> ui.js -> alumnos.js" },
    { type: "code", text: "storage.js -> ui.js -> docentes.js" },
    { type: "heading", text: "4. Persistencia con localStorage" },
    { type: "para", text: "localStorage solo almacena texto. Por eso guardarDatos convierte arreglos y objetos a JSON con JSON.stringify. obtenerDatos recupera el texto con getItem y lo convierte de nuevo con JSON.parse. Si no existe la clave, devuelve un arreglo vacio." },
    { type: "code", text: "guardarDatos(\"alumnos\", alumnos)" },
    { type: "code", text: "const alumnos = obtenerDatos(\"alumnos\")" },
    { type: "para", text: "Las claves alumnos y docentes mantienen separadas las dos colecciones. Los datos sobreviven a una recarga y al cierre del navegador, pero no se comparten con otros navegadores ni con el backend." },
    { type: "heading", text: "5. Modulo de alumnos" },
    { type: "para", text: "alumnos.html contiene un formulario con nombre, carrera y correo, y una tabla cuyo tbody tiene el id listaAlumnos. La tabla comienza vacia porque alumnos.js crea sus filas en tiempo de ejecucion." },
    { type: "para", text: "Al iniciar, mostrarAlumnos(obtenerAlumnos()) lee la lista guardada y la renderiza. Para cada objeto genera una fila con ID, nombre, carrera, correo y botones de editar y eliminar." },
    { type: "heading", text: "Alta de alumno" },
    { type: "para", text: "El evento submit cancela el envio tradicional con preventDefault. Luego trim elimina espacios externos y se validan campos obligatorios, longitud minima de nombre y carrera y formato del correo." },
    { type: "code", text: "const alumno = { id: Date.now(), nombre, carrera, correo }" },
    { type: "para", text: "Si no hay una edicion activa, el objeto se agrega con push. La lista completa se guarda de nuevo y la tabla se actualiza. Finalmente se reinicia el formulario." },
    { type: "heading", text: "Edicion y eliminacion" },
    { type: "para", text: "Al pulsar editar, editarAlumno busca el ID, completa los inputs y guarda alumnoEditandoId. El siguiente submit modifica ese objeto en lugar de crear uno nuevo. alumnoEditar permite detectar el caso en que no se cambio ningun dato." },
    { type: "para", text: "Al pulsar eliminar, el programa pide confirmacion. filter crea una lista sin el ID elegido, la persiste y vuelve a renderizar la tabla. Si el registro estaba en edicion, tambien se vacia el formulario." },
    { type: "heading", text: "6. Modulo de docentes" },
    { type: "para", text: "docentes.js repite el mismo patron de alumnos, pero utiliza la clave docentes y el campo especialidad. Sus funciones principales son obtenerDocentes, mostrarDocentes, editarDocente y eliminarDocente." },
    { type: "para", text: "La duplicacion es comprensible mientras se aprende CRUD. A futuro se podria extraer una funcion generica, pero conviene priorizar primero una API comun y validaciones consistentes." },
    { type: "heading", text: "7. Utilidades de ui.js" },
    { type: "para", text: "mostrarMensaje escribe un texto en #mensaje, aplica una clase y lo oculta luego de 3000 milisegundos. Las clases mje-exito, mje-error y mje-advertencia cambian el color visual." },
    { type: "para", text: "escaparHTML coloca el texto en textContent y devuelve innerHTML. Esto evita que un dato ingresado por una persona se interprete como etiquetas o script cuando se inserta en la tabla." },
    { type: "para", text: "esCorreoValido utiliza una expresion regular basica: exige texto antes y despues de @ y un punto en el dominio. Es una validacion practica del lado del cliente, no una verificacion de existencia del correo." },
    { type: "heading", text: "8. CSS y experiencia visual" },
    { type: "para", text: "estilos.css define el fondo, encabezado, navegacion, formularios, botones, tablas, tarjetas y mensajes. La media query de 700px cambia el menu y los formularios a una disposicion mas adecuada para pantallas pequenas." },
    { type: "para", text: "Los iconos de acciones provienen de Font Awesome mediante CDN. Para usar la aplicacion con internet limitada, se podria instalar Font Awesome localmente o reemplazar esos iconos por texto accesible." },
    { type: "heading", text: "9. Backend Express" },
    { type: "para", text: "server.js crea la aplicacion Express, habilita express.json y monta las rutas de alumnos bajo el prefijo /alumnos. Luego escucha en el puerto 3000." },
    { type: "code", text: "GET    /alumnos       lista todos los alumnos" },
    { type: "code", text: "GET    /alumnos/:id   busca un alumno por ID" },
    { type: "code", text: "POST   /alumnos       recibe un alumno en req.body" },
    { type: "code", text: "PUT    /alumnos/:id   actualiza un alumno" },
    { type: "code", text: "DELETE /alumnos/:id   elimina un alumno" },
    { type: "para", text: "El controlador contiene las consultas GET. data/alumnos.js exporta un arreglo con Ana y Jose, que funciona como fuente temporal de datos mientras no existe MongoDB." },
    { type: "heading", text: "10. Problemas actuales del backend" },
    { type: "para", text: "Hay dos errores que deben corregirse antes de probar POST y DELETE: routes/alumnos.routes.js usa alumnos pero no importa ese arreglo desde data/alumnos.js; ademas data/alumnos.js exporta una constante y DELETE intenta reasignarla con alumnos = filter(...)." },
    { type: "para", text: "Tambien conviene validar que un ID exista antes de acceder a sus propiedades y devolver estados HTTP apropiados, por ejemplo 404 cuando no se encuentra un alumno y 201 al crear uno." },
    { type: "heading", text: "11. Como ejecutar" },
    { type: "code", text: "cd Backend" },
    { type: "code", text: "npm install" },
    { type: "code", text: "npm start" },
    { type: "para", text: "Con el servidor iniciado, la API queda disponible en http://localhost:3000. Para probarla se pueden usar las solicitudes de pruebas del archivo Backend/pruebas.http si el editor tiene una extension HTTP instalada." },
    { type: "para", text: "El frontend puede abrirse desde Frontend/index.html. Para evitar restricciones del navegador al usar fetch en el futuro, sera conveniente servir Frontend con un servidor local y configurar CORS en Express." },
    { type: "heading", text: "12. Flujo completo de un alta" },
    { type: "code", text: "1. La persona completa el formulario." },
    { type: "code", text: "2. submit evita recargar la pagina." },
    { type: "code", text: "3. Se limpian y validan los valores." },
    { type: "code", text: "4. Se crea o modifica un objeto JavaScript." },
    { type: "code", text: "5. JSON.stringify guarda la lista." },
    { type: "code", text: "6. La tabla se regenera con innerHTML." },
    { type: "code", text: "7. Se muestra un mensaje y se limpia el formulario." },
    { type: "heading", text: "13. Proximos pasos sugeridos" },
    { type: "para", text: "1) Arreglar las rutas POST y DELETE del backend. 2) Conectar alumnos.js y docentes.js con fetch. 3) Agregar CORS y manejo de errores. 4) Persistir en MongoDB. 5) Incorporar autenticacion. 6) Crear los modulos de cursos y materias. 7) Agregar pruebas para validaciones y endpoints." },
    { type: "heading", text: "14. Ideas clave para estudiar" },
    { type: "para", text: "HTML define estructura; CSS define presentacion; JavaScript agrega comportamiento. Los eventos conectan acciones de la persona con funciones. JSON permite transportar estructuras como texto. localStorage persiste en el navegador. Express recibe solicitudes HTTP y devuelve respuestas JSON. Un CRUD representa crear, leer, actualizar y eliminar." },
    { type: "footer-note", text: "Documento generado a partir del estado actual del proyecto SGA." }
]

function wrap(text, maxChars) {
    const words = text.split(/\s+/)
    const lines = []
    let line = ""
    for (const word of words) {
        if (!line) {
            line = word
        } else if ((line + " " + word).length <= maxChars) {
            line += " " + word
        } else {
            lines.push(line)
            line = word
        }
    }
    if (line) lines.push(line)
    return lines
}

const pages = []
let page = []
let lineCount = 0

function ensure(linesNeeded = 1) {
    if (lineCount + linesNeeded > maxLines) {
        pages.push(page)
        page = []
        lineCount = 0
    }
}

function addLine(text, style = "body") {
    ensure()
    page.push({ text, style })
    lineCount++
}

function addBlank() { addLine("", "body") }

for (const section of sections) {
    if (section.type === "title") {
        ensure(4);
        addLine(section.text, "title");
        addBlank()
    } else if (section.type === "subtitle") {
        addLine(section.text, "subtitle");
        addBlank()
    } else if (section.type === "heading") {
        ensure(3);
        addBlank();
        addLine(section.text, "heading")
    } else if (section.type === "code") {
        const lines = wrap(section.text, 88)
        for (const line of lines) addLine(line, "code")
    } else if (section.type === "footer-note") {
        addBlank();
        addLine(section.text, "small")
    } else {
        for (const line of wrap(section.text, 92)) addLine(line, "body")
        addBlank()
    }
}
if (page.length) pages.push(page)

function pdfText(text) {
    return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)")
}

function colorFor(style) {
    if (style === "title") return "0.16 0.27 0.36 rg"
    if (style === "subtitle") return "0.35 0.35 0.35 rg"
    if (style === "heading") return "0.10 0.38 0.42 rg"
    if (style === "code") return "0.22 0.22 0.22 rg"
    if (style === "small") return "0.45 0.45 0.45 rg"
    return "0.12 0.12 0.12 rg"
}

function sizeFor(style) {
    if (style === "title") return 22
    if (style === "subtitle") return 13
    if (style === "heading") return 14
    if (style === "small") return 8
    return fontSize
}

const objects = []

function addObject(body) { objects.push(body); return objects.length }
const catalogId = addObject(null)
const pagesId = addObject(null)
const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
const pageIds = []
for (const pageLines of pages) {
    let stream = "BT\n"
    let y = pageHeight - margin
    for (const item of pageLines) {
        const size = sizeFor(item.style)
        const leading = item.style === "title" ? 28 : item.style === "heading" ? 19 : 14
        y -= leading
        if (y < margin) break
        stream += `${colorFor(item.style)}\n/F1 ${size} Tf\n1 0 0 1 ${margin} ${y} Tm\n(${pdfText(item.text)}) Tj\n`
    }
    stream += "ET"
    const streamId = addObject(`<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`)
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${streamId} 0 R >>`)
    pageIds.push(pageId)
}
objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`

let pdf = "%PDF-1.4\n%\n"
const offsets = [0]
for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "latin1"))
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
}
const xref = Buffer.byteLength(pdf, "latin1")
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let i = 1; i < offsets.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`
fs.writeFileSync(output, Buffer.from(pdf, "latin1"))
console.log(`PDF creado: ${output}`)
console.log(`Paginas: ${pages.length}`)