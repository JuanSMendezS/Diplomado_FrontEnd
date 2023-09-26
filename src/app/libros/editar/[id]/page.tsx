"use client";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import { Libro, useMyContext } from "@/Hooks/MyProvider";
//esta es la funcion que permite modificar el libro
import { modificarLibro } from "../../../../../api";

export default function ModificarLibro({ params }: { params: { id: string } }) {
  const id = params.id;
  const { libros } = useMyContext();
  const [oldLibro, setOldLibro] = useState<Libro>();
  const [nuevoTitulo, setNuevoTitulo] = useState<string>("");
  const [nuevoAutor, setNuevoAutor] = useState<string>("");
  const [nuevaFoto, setNuevaFoto] = useState<string>("");
  const [nuevaDescripcion, setNuevaDescripcion] = useState<string>("");

  useEffect(() => {
    const libroEncontrado = libros.find((libro) => libro.id === id);
    setOldLibro(libroEncontrado);
    if (libroEncontrado) {
      setNuevoTitulo(libroEncontrado.titulo);
      setNuevoAutor(libroEncontrado.autor);
      setNuevaFoto(libroEncontrado.foto);
      setNuevaDescripcion(libroEncontrado.descripcion);
    }
  }, [libros]);

  const handleClick = (e, id: string) => {
    e.preventDefault();
    const libroModificado = {
      id: id,
      titulo: nuevoTitulo,
      autor: nuevoAutor,
      foto: nuevaFoto,
      descripcion: nuevaDescripcion,
      disponiblidad: oldLibro.disponiblidad,
      estado: oldLibro.estado,
    };
    modificarLibro(id, libroModificado);
    window.location.href = `/libros`;
  };
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="bg-fondo-color h-full w-full box-border md:h-[900px] md:w-8/12 lg:max-w-[675px] md:rounded-small md:mt-2 flex items-center justify-center flex-col ">
        <p className="text-5xl mb-5">Modificar Libro</p>
        <form className="w-full px-8" onSubmit={(e) => handleClick(e, id)}>
          <Input
            type="text"
            label="Titulo"
            name="titulo"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            variant="bordered"
          />
          <Input
            type="text"
            label="Autor"
            className="pt-5"
            name="autor"
            variant="bordered"
            value={nuevoAutor}
            onChange={(e) => setNuevoAutor(e.target.value)}
          />
          <Input
            type="text"
            label="Enlace de portada"
            className="pt-5"
            name="enlace"
            variant="bordered"
            value={nuevaFoto}
            onChange={(e) => setNuevaFoto(e.target.value)}
          />
          <Input
            type="text"
            label="Descripcion"
            className="pt-5"
            name="descripcion"
            variant="bordered"
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
          />

          <Button
            type="submit"
            title="Iniciar Sección"
            className="w-full mt-5"
            color="primary"
          >
            Guardar
          </Button>
        </form>
        <Divider className="my-6" />
      </div>
    </main>
  );
}
