import { ListaAlumnos } from "./components/ListaAlumnos"
import { useState } from "react"
import FormularioA from "./components/FormularioA"
// import EjemploMUI from "./components/ejemplos/EjemploMUI"
import { FAQ } from "./components/ejemplos/FAQ"
import SelectorTema from "./components/SelectorTema"

function App()
{
const [actualizar, setActualizar] = useState(0)
const [alumnoEditar, setAlumnoEditar] = useState(null)

function alumnoCreado() {
  setActualizar(valor => valor + 1)
  setAlumnoEditar(null)
}

function seleccionarAlumno(alumno) {
  setAlumnoEditar(alumno)
}

return (
   <>
    <SelectorTema />
    <FAQ /> 
     {/* <EjemploMUI />  */}
   <FormularioA key={alumnoEditar?.legajo ?? "nuevo"}
   onAlumnoCreado={alumnoCreado}
   alumnoEditar={alumnoEditar}
   onCancelar={() => setAlumnoEditar(null)}
   />
   <ListaAlumnos 
   actualizar={actualizar} 
   onAlumnoCreado={alumnoCreado}
   onEditarAlumno={seleccionarAlumno} 
   /> 
  </>
  )
}
export default App