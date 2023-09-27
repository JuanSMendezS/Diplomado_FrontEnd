import { Input, Divider, Button } from "@nextui-org/react";
import { useApi, useForm, useSwal } from "../hooks/utils";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const RecordBook = () => {
  const {
    onInputChange,
    formState,
    titulo,
    autor,
    foto,
    descripcion,
    disponibilidad,
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

  useEffect(() => {
    if (errorApi) {
      toast({ text: errorApi, icon: "error", position: "top" });
    }
  }, [errorApi]);

  if (
    !permisos
      ?.filter((item) => item.modulosAcciones.id_modulos === 10)
      .map((item) => item.modulosAcciones.id_acciones)
      .includes(2)
  ) {
    return <Navigate to="/" />;
  }
  const soloNumeros = (e) => {
    const key = e.charCode;
    if (!(key >= 48 && key <= 57)) {
      e.preventDefault();
    }
  };
  return (
    <main className="w-screen flex items-center justify-center">
      <div className="bg-fondo-color h-full w-full box-border md:h-[900px] md:w-8/12 lg:max-w-[675px] md:rounded-small md:mt-2 flex items-center justify-center flex-col ">
        <p className="text-5xl mb-5">Registra Libro</p>
        <form className="w-full px-8" onSubmit={(e) => crearLibro(e)}>
          <Input
            type="text"
            label="Titulo"
            name="titulo"
            value={titulo}
            onChange={onInputChange}
            variant="bordered"
          />
          <Input
            type="text"
            label="Autor"
            className="pt-5"
            name="autor"
            variant="bordered"
            value={autor}
            onChange={onInputChange}
          />
          <Input
            type="text"
            label="Descripcion"
            className="pt-5"
            name="descripcion"
            variant="bordered"
            value={descripcion}
            onChange={onInputChange}
          />
          <Input
            type="text"
            label="Cantidad de ejemplares"
            className="pt-5"
            name="disponibilidad"
            variant="bordered"
            onKeyPress={soloNumeros}
            value={disponibilidad}
            onChange={onInputChange}
          />

          <div className="flex items-center justify-center w-full mt-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {foto.file !== undefined ? (
                <img
                  alt="Relaxing app background"
                  className="z-0 w-full h-full bg-cover rounded-md"
                  src={foto.url}
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Haga clic para cargar</span>{" "}
                    o arrastrar y soltar
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept=".jpg, .png, .svg"
                name="foto"
                // value={foto}
                onChange={(e) => onInputChange(e, true)}
              />
            </label>
          </div>
          <Button
            type="submit"
            title="Iniciar Sección"
            className="w-full mt-5"
            color="primary"
            isLoading={loadingApi}
          >
            Registrar
          </Button>
        </form>
        <Divider className="my-6" />
      </div>
    </main>
  );
};
