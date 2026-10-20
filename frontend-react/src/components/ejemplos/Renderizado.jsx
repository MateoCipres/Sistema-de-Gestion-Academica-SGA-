import {useState} from "react"

function Renderizado() {
  const [contador, setContador] = useState(0)
  console.log("Renderizado...")

  return (
    <>
      <h2>{contador}</h2>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </>
  )
}

export default Renderizado