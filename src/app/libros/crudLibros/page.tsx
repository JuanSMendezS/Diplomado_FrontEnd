"use client";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import React from "react";
/***Aqui llamo a la funcion buscar libro */
import { agregarLibro } from "../../../../api";

export default function Page() {
  const [titulo, setTitulo] = React.useState<string>("");
  const [autor, setAutor] = React.useState<string>("");
  const [enlace, setEnlace] = React.useState<string>("");
  const [descripcion, setDescripcion] = React.useState<string>("");
  const [ejemplares, setEjemplares] = React.useState<number>();
  const [estado, setEstado] = React.useState<number>();

  const crearLibro = (e: any) => {
    e.preventDefault();
    const libroNuevo = {
      autor: autor,
      titulo: titulo,
      foto: enlace,
      descripcion: descripcion,
      disponibilidad: ejemplares,
      estado: estado,
    };
    agregarLibro(libroNuevo);
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="bg-fondo-color h-full w-full box-border md:h-[900px] md:w-8/12 lg:max-w-[675px] md:rounded-small md:mt-2 flex items-center justify-center flex-col ">
        <p className="text-5xl mb-5">Registar Libro</p>
        <form className="w-full px-8" onSubmit={(e) => crearLibro(e)}>
          <Input
            type="text"
            label="Titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            variant="bordered"
          />
          <Input
            type="text"
            label="Autor"
            className="pt-5"
            name="autor"
            variant="bordered"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
          <Input
            type="text"
            label="Enlace de portada"
            className="pt-5"
            name="enlace"
            variant="bordered"
            value={enlace}
            onChange={(e) => setEnlace(e.target.value)}
          />
          <Input
            type="text"
            label="Descripcion"
            className="pt-5"
            name="descripcion"
            variant="bordered"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <Input
            type="number"
            label="Cantidad de ejemplares"
            className="pt-5"
            name="disponibilidad"
            variant="bordered"
            value={ejemplares}
            onChange={(e) => setEjemplares(e.target.value)}
          />
          <Input
            type="number"
            label="Estado"
            className="pt-5"
            name="estado"
            variant="bordered"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <Button
            type="submit"
            title="Iniciar Sección"
            className="w-full mt-5"
            color="primary"
          >
            Registrar
          </Button>
        </form>
        <Divider className="my-6" />
      </div>
    </main>
  );
}
