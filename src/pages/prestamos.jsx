import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    // TableRow,
    // TableCell,
    // Button,
    Input,
  } from "@nextui-org/react";
//   import { useLibros } from "../hooks/pages";
  
  export const Prestamos = () => {

    return (
      <div className="w-[60%] m-auto my-10">
        <div className="w-full flex justify-end mb-5 items-end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Ingrese titulo..."
            size="sm"
            // onChange={(e) => Filtrar(e.target.value)}
            type="search"
            color="secondary"
          />
        </div>
  
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Titulo</TableColumn>
            <TableColumn>Autor</TableColumn>
            <TableColumn>Fecha de préstamo</TableColumn>
            <TableColumn>Fecha devolución</TableColumn>
            <TableColumn>Devolver</TableColumn>
          </TableHeader>
          <TableBody>
            {/* {libros.map((libro) => {
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
            })} */}
          </TableBody>
        </Table>
      </div>
    );
  };
  