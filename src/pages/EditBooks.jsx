import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

export const EditBooks = ({ libros }) => {
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
                <TableCell>{libro.disponiblidad}</TableCell>
                <TableCell>
                  <Button color="warning" variant="ghost" onClick={() => {}}>
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="secondary" variant="ghost" onClick={() => {}}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
