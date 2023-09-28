import CompCard from "../components/CompCard";
import { Button, Input, Link } from "@nextui-org/react";
import { useLibros } from "../hooks/pages/";

export const Libros = () => {
  const { libros, permisos, Filtrar, loadingApi, loanBook } = useLibros();

  return (
    <>
      <div className="w-[88%] m-auto flex justify-end">
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
          onChange={(e) => Filtrar(e.target.value)}
          type="search"
          color="secondary"
        />
        {permisos?.includes(3) && (
          <Link href="/libros/edit-book">
            <Button variant="flat" color="primary" className="mx-4">
              Editar
            </Button>
          </Link>
        )}

        {permisos?.includes(2) && (
          <Link href="/libros/record-book">
            <Button variant="flat" color="secondary">
              Agregar
            </Button>
          </Link>
        )}
      </div>
      <div className="w-[90%] flex justify-start flex-wrap m-auto mt-6 gap-6">
        {libros.map((libro) => {
          return (
            <CompCard
              key={libro.id}
              datos={libro}
              loanBook={loanBook}
              loading={loadingApi}
            />
          );
        })}
      </div>
    </>
  );
};
