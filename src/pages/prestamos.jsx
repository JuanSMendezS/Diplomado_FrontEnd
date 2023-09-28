import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { usePrestamos } from "../hooks/pages";

export const Prestamos = () => {
  const { dateFormat, devolver, loadingApi, prestamos } = usePrestamos();
  return (
    <div className="w-[60%] m-auto my-10">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Titulo</TableColumn>
          <TableColumn>Autor</TableColumn>
          <TableColumn>Fecha de préstamo</TableColumn>
          <TableColumn>Fecha devolución</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          {prestamos.map((prestamo) => {
            return (
              <TableRow key={prestamo.id}>
                <TableCell>{prestamo.Libros.titulo}</TableCell>
                <TableCell>{prestamo.Libros.autor}</TableCell>
                <TableCell>
                  {dateFormat(new Date(prestamo.createdAt))}
                </TableCell>
                <TableCell>
                  {prestamo.fecha_devolucion
                    ? dateFormat(new Date(prestamo.fecha_devolucion))
                    : ""}
                </TableCell>
                {prestamo.fecha_devolucion ? (
                  <TableCell></TableCell>
                ) : (
                  <TableCell>
                    <Button
                      color="secondary"
                      variant="ghost"
                      isLoading={loadingApi}
                      onClick={() => devolver(prestamo.id)}
                    >
                      Devolver
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
