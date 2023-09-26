import CompCard from "../components/CompCard";
import { Button, Link } from "@nextui-org/react";
import { useLibros } from "../hooks/pages/";

export const Libros = () => {
  const { libros, permisos } = useLibros();

  return (
    <>
      <div className="w-[88%] m-auto flex justify-end">
        {permisos?.includes(3) && (
          <Link  href="/libros/editar">
            <Button variant="flat" color="primary" className="mx-4">
              Editar
            </Button>
          </Link>
        )}

        {permisos?.includes(2) && (
          <Link  href="/libros/record-book">
            <Button variant="flat" color="secondary">
              Agregar
            </Button>
          </Link>
        )}
      </div>
      <div className="w-[90%] flex justify-start flex-wrap m-auto mt-6 gap-6">
        {libros.map((libro) => {
          return <CompCard key={libro.id} datos={libro} />;
        })}
      </div>
    </>
  );
};
