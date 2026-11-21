import Alumnos from "./pages/Alumnos";
import { FAQ } from "./pages/FAQ";
import { Routes, Route } from "react-router-dom";
import LayoutPpal from "./layouts/LayoutPpal";
import Inicio from "./pages/Inicio";
import Docentes from "./pages/Docentes";
import Login from "./pages/Login";
import Materias from "./pages/Materias";
import RutaProtegida from "./components/RutaProtegida";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RutaProtegida />}>
        <Route path="/" element={<LayoutPpal />}>
          <Route index element={<Inicio />} />
          <Route path="alumnos" element={<Alumnos />} />
          <Route path="docentes" element={<Docentes />} />
          <Route path="materias" element={<Materias />} />
          <Route path="ayuda" element={<FAQ />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;