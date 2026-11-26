import { ListaCursos } from "../components/ListaCursos"
import { useState } from "react"
import FormularioC from "../components/FormularioC"
import { useAuth } from "../context/useAuth"

export default function Cursos() {
const [actualizar, setActualizar] = useState(0)
const [cursoEditar, setCursoEditar] = useState(null)
const { usuario } = useAuth()

function cursoCreado() {
  setActualizar(valor => valor + 1)
  setCursoEditar(null)
}

function seleccionarCurso(curso) {
  setCursoEditar(curso)
}

return (
   <>
   {usuario?.rol === "admin" && (
   <FormularioC key={cursoEditar?.codigo ?? "nuevo"}
   onCursoCreado={cursoCreado}
   cursoEditar={cursoEditar}
   onCancelar={() => setCursoEditar(null)}
   />
  )}
   <ListaCursos 
   actualizar={actualizar} 
   onCursoCreado={cursoCreado}
   onEditarCurso={seleccionarCurso} 
   /> 
  </>
  )
}