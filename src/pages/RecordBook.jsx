import { Input, Divider, Button } from "@nextui-org/react";
import { Navigate } from "react-router-dom";
import { useManagerBook } from "../hooks/pages";

export const RecordBook = () => {
  const {
    crearLibro,
    loadingApi,
    onInputChange,
    permisos,
    soloNumeros,
    titulo,
    autor,
    descripcion,
    disponibilidad,
    foto,
    id,
    editarLibro,
  } = useManagerBook();
  if (
    !permisos
      ?.filter((item) => item.modulosAcciones.id_modulos === 10)
      .map((item) => item.modulosAcciones.id_acciones)
      .includes(2)
  ) {
    return <Navigate to="/" />;
  }
  return (
    <main className="w-screen flex items-center justify-center">
      <div className="bg-fondo-color h-full w-full box-border md:h-[900px] md:w-8/12 lg:max-w-[675px] md:rounded-small md:mt-2 flex items-center justify-center flex-col ">
        <p className="text-5xl mb-5">Registra Libro</p>
        <form
          className="w-full px-8"
          onSubmit={(e) => (id ? editarLibro(e) : crearLibro(e))}
        >
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
          {id ? (
            <Button
              type="submit"
              title="Actualizar"
              className="w-full mt-5"
              color="warning"
              isLoading={loadingApi}
            >
              Actualizar
            </Button>
          ) : (
            <Button
              type="submit"
              title="Registrar"
              className="w-full mt-5"
              color="primary"
              isLoading={loadingApi}
            >
              Registrar
            </Button>
          )}
        </form>
        <Divider className="my-6" />
      </div>
    </main>
  );
};
