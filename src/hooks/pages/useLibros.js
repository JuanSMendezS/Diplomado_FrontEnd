import { useContext, useEffect, useState } from "react";
import { useApi, useForm, useSwal } from "../utils";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const { loadApi, errorApi, loadingApi } = useApi();
  const { alert } = useSwal();
  const { permisos } = useContext(AuthContext);
  const history = useNavigate();

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

  const deleteBook = async (id) => {
    try {
      const { data } = await loadApi({
        endpoint: "libros/" + id,
        type: "delete",
        token: true,
      });
      if (data.estado) {
        const list = libros.filter((item) => item.id !== id);
        setLibros(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectEdit = (id) => {
    history("/libros/edit-book/" + id);
  };
  return {
    libros,
    permisos: permisos
      ?.filter((item) => item.modulosAcciones.id_modulos === 10)
      .map((item) => item.modulosAcciones.id_acciones),
    deleteBook,
    loadingApi,
    redirectEdit,
  };
};

export const useManagerBook = () => {
  const params = useParams();
  const id = params?.id;
  const {
    onInputChange,
    formState,
    titulo,
    autor,
    foto,
    descripcion,
    disponibilidad,
    changeInicialForm,
  } = useForm({
    titulo: "",
    autor: "",
    foto: {
      file: undefined,
      url: "",
    },
    descripcion: "",
    disponibilidad: "",
  });
  const { permisos } = useContext(AuthContext);
  const { errorApi, loadingApi, loadApi } = useApi();
  const { toast, alert } = useSwal();
  const history = useNavigate();

  const getBook = async () => {
    const { data } = await loadApi({
      token: true,
      type: "get",
      endpoint: "libros/" + id,
    });
    if (data.estado) {
      const { book } = data;
      if (book.foto) {
        changeInicialForm({
          ...book,
          foto: {
            file: {},
            url: `data:image/${book.foto.extension};base64,${book.foto.Base64}`,
          },
        });
      } else {
        changeInicialForm({
          ...book,
          foto: {
            file: undefined,
            url: "",
          },
        });
      }
    } else {
      toast({
        icon: "error",
        text: "No se encontró el libro.",
        position: "top",
      });
      history("/libros/edit-book/");
    }
  };

  const crearLibro = async (e) => {
    e.preventDefault();
    if (!titulo) {
      toast({
        icon: "warning",
        text: "Debe ingresar el titulo.",
        position: "top",
      });
      return;
    }
    if (!autor) {
      toast({
        icon: "warning",
        text: "Debe ingresar el autor.",
        position: "top",
      });
      return;
    }
    if (!descripcion) {
      toast({
        icon: "warning",
        text: "Debe ingresar la descripción.",
        position: "top",
      });
      return;
    }
    if (!disponibilidad) {
      toast({
        icon: "warning",
        text: "Debe ingresar la disponibilidad.",
        position: "top",
      });
      return;
    }

    try {
      const { data } = await loadApi({
        body: { ...formState, foto: foto.file },
        file: true,
        token: true,
        type: "POST",
        endpoint: "libros",
      });
      if (data.estado) {
        alert({ text: "El Libro se registro con éxito.", icon: "success" });
        history("/libros");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editarLibro = async (e) => {
    e.preventDefault();
    if (!titulo) {
      toast({
        icon: "warning",
        text: "Debe ingresar el titulo.",
        position: "top",
      });
      return;
    }
    if (!autor) {
      toast({
        icon: "warning",
        text: "Debe ingresar el autor.",
        position: "top",
      });
      return;
    }
    if (!descripcion) {
      toast({
        icon: "warning",
        text: "Debe ingresar la descripción.",
        position: "top",
      });
      return;
    }
    if (!disponibilidad) {
      toast({
        icon: "warning",
        text: "Debe ingresar la disponibilidad.",
        position: "top",
      });
      return;
    }
    try {
      const { data } = await loadApi({
        body: { ...formState, foto: foto.file },
        file: true,
        token: true,
        type: "put",
        endpoint: "libros/" + id,
      });
      if (data.estado) {
        alert({ text: "El Libro se registro con éxito.", icon: "success" });
        history("/libros");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const soloNumeros = (e) => {
    const key = e.charCode;
    if (!(key >= 48 && key <= 57)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      getBook();
    }
  }, []);

  useEffect(() => {
    if (errorApi) {
      toast({ text: errorApi, icon: "error", position: "top" });
    }
  }, [errorApi]);

  return {
    soloNumeros,
    crearLibro,
    onInputChange,
    permisos,
    loadingApi,
    id,
    editarLibro,
    ...formState,
  };
};
