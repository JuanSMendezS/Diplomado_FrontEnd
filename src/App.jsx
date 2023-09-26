import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import CompNavbar from "./components/CompNavbar";
import { Register, Home, Libros, RecordBook } from "./pages";
import { AuthContext } from "./context/AuthContext";
const ProtectedRoute = ({ children, id }) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  const { permisos = [] } = useContext(AuthContext);

  const Permisos =
    permisos.map((item) => item.modulosAcciones.id_modulos) || [];

  if (!Permisos.includes(id)) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <main className="dark text-foreground">
      <BrowserRouter>
        <CompNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrarse" element={<Register />} />
          <Route
            path="/libros"
            element={
              <ProtectedRoute id={10}>
                <Libros />
              </ProtectedRoute>
            }
          />
          <Route
            path="/libros/record-book"
            element={
              <ProtectedRoute id={10}>
                <RecordBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
