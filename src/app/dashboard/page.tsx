"use client";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import Link from "next/link";

const page = () => {
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="bg-cuc h-full w-full box-border md:h-[900px] md:w-8/12 lg:max-w-[675px] md:rounded-small md:mt-2 flex items-center justify-center flex-col ">
        <p className="text-5xl mb-5">Registro</p>
        <form className="w-full px-8">
          <Input
            type="text"
            label="Nombre"
            name="name"
            //value={email}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Apellidos"
            className="pt-5"
            name="apellidos"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Direccion"
            className="pt-5"
            name="direccion"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Tipo Documento"
            className="pt-5"
            name="id_tipo_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero de documento"
            className="pt-5"
            name="numero_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefonico"
            className="pt-5"
            name="numero_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefonico"
            className="pt-5"
            name="numero_documento"
            //asdasdgit
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefonico"
            className="pt-5"
            name="numero_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Button
            type="submit"
            title="Iniciar Sección"
            className="w-full bg-cuc-dorado hover:bg-cuc-dorado-hover mt-5"
          >
            Registrar
          </Button>
        </form>
        <Divider className="my-6" />
        <p className="mt-3">
          ¿Ya estas registrado?{" "}
          <Link href="/" className="text-cuc-dorado">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default page;
