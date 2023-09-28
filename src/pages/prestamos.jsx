import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useApi, useSwal } from "../hooks/utils";

export const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const { errorApi, loadApi, loadingApi } = useApi();
  const { toast } = useSwal();

  const getPrestamos = async () => {
    try {
      const { data } = await loadApi({
        token: true,
        type: "post",
        endpoint: "libros/get-loan-book",
      });
      if (data.estado) {
        setPrestamos(data.loanBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const devolver = async (id) => {
    try {
      const { data } = await loadApi({
        token: true,
        type: "post",
        endpoint: "libros/return-book",
        body: { id },
      });
      if (data.estado) {
        const list = prestamos.map((item) => {
          if (item.id === data.prestamo.id) {
            item.fecha_devolucion = data.prestamo.fecha_devolucion;
          }
          return item;
        });
        setPrestamos(list);
        toast({
          icon: "success",
          text: "Se realizo la devolución con éxito!",
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrestamos();
  }, []);

  useEffect(() => {
    if (errorApi) {
      toast({ icon: "error", text: errorApi });
    }
  }, [errorApi]);

  const dateFormat = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
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
                <TableCell>{prestamo.Libros.titulo}</TableCell>
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
