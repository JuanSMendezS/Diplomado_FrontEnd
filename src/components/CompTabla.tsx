"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import CompBoton from "@/components/CompBoton";
import { Libro, useMyContext } from "@/hooks/MyProvider";
const CompTabla = ({ libros }: { libros: Libro[] }) => {
  const { buscarLibro } = useMyContext();
  return (
    <div className="w-[60%] m-auto my-10">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Titulo</TableColumn>
          <TableColumn>Autor</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Modificar</TableColumn>
          <TableColumn>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {libros.map((libro: any) => {
            return (
              <TableRow key={libro.id}>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor}</TableCell>
                <TableCell>{libro.disponiblidad}</TableCell>
                <TableCell>
                  <CompBoton
                    name="Editar"
                    color="primary"
                    buscar={buscarLibro}
                    id={libro.id}
                  />
                </TableCell>
                <TableCell>
                  <CompBoton
                    name="Eliminar"
                    color="secondary"
                    buscar={buscarLibro}
                    id={libro.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompTabla;
