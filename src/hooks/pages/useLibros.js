import { useContext, useEffect, useState } from "react";
import { useApi, useSwal } from "../utils";
import { AuthContext } from "../../context/AuthContext";



export const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const { loadApi, errorApi } = useApi();
  const { alert } = useSwal();
  const {permisos}= useContext(AuthContext);

  useEffect(() => {
    const getLibros = async () => {
      try {
        const { data } = await loadApi({
          endpoint: "libros",
          type: "GET",
          token: true,
        });
        if (data.estado) {
          setLibros(data.books);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLibros();
  }, []);

  useEffect(() => {
    if (errorApi) {
      alert({ text: errorApi, icon: "error" });
    }
  }, [errorApi]);

  return {libros, permisos: permisos?.filter(item => item.modulosAcciones.id_modulos===10).map(item => item.modulosAcciones.id_acciones)};
};
