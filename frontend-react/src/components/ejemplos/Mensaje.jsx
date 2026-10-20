import { useState } from "react";

function Mensaje() {
    const [mensaje, setMensaje] = useState("Hola, alumno");

    return (
        <>
            <h2>{mensaje}</h2>
            <button onClick={() => setMensaje("¡Bienvenidos a Programación IV!")}>
                Cambiar mensaje
            </button>
        </>
    );
}

export default Mensaje;