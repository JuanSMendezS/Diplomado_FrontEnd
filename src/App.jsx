import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import CompNavbar from "./components/CompNavbar";
import { Register, Home, Libros, RecordBook, EditBooks, Recuperar, Prestamos } from "./pages";
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
          <Route
            path="/libros/edit-book"
            element={
              <ProtectedRoute id={10}>
                <EditBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/libros/edit-book/:id"
            element={
              <ProtectedRoute id={10}>
                <RecordBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/libros/loan"
            element={
              <ProtectedRoute id={10}>
                <Prestamos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/forget/:token"
            element={
              <Recuperar />
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
