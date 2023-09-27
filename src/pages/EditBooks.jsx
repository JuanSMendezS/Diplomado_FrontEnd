import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useLibros } from "../hooks/pages";

export const EditBooks = () => {
  const { libros, permisos, deleteBook, loadingApi, redirectEdit } =
    useLibros();

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
          {libros.map((libro) => {
            return (
              <TableRow key={libro.id}>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor}</TableCell>
                <TableCell>{libro.disponibilidad}</TableCell>
                {permisos?.includes(3) && (
                  <TableCell>
                    <Button
                      color="warning"
                      variant="ghost"
                      onClick={() => redirectEdit(libro.id)}
                      isLoading={loadingApi}
                    >
                      Editar
                    </Button>
                  </TableCell>
                )}
                {permisos?.includes(4) && (
                  <TableCell>
                    <Button
                      color="secondary"
                      variant="ghost"
                      isLoading={loadingApi}
                      onClick={() => deleteBook(libro.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
