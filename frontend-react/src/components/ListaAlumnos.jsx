import { useEffect, useState } from "react"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado }) {
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar alumno")
        }
    }
    useEffect(() => {
        async function cargarAlumnos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar])

    if (cargando) {
        return <p>Cargando alumnos...</p>
    }
    if (error) {
        return <p role="alert">{error}</p>
    }
    return (
    <section>
    <h2>Alumnos</h2>
    {alumnos.length === 0 
    ? (<p>No hay alumnos registrados.</p>)
    : ( 
        <ul style={{listStyle:"none"}}>
        {alumnos.map(alumno => (
            <li key={alumno.legajo}>
            {alumno.legajo} - {alumno.nombre} - {alumno.carrera}
            <br />
            <button 
            type="button"
            onClick={()=> eliminarAlumno(alumno.legajo)}
            >
                Eliminar
            </button>
        </li>)
    )}
    </ul>
    )}
    </section>
    )
}