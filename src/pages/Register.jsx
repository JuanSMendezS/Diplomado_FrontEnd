import { useRegister } from "../hooks/pages";
import { Button, Divider, Input, Link } from "@nextui-org/react";
export const Register = () => {
  const {
    onInputChange,
    onSubmit,
    nombres,
    apellidos,
    direccion,
    email,
    loadingApi,
    numero_identificacion,
    numero_telefono,
    password,
  } = useRegister();

  return (
    <main className="flex items-center justify-center">
      <div className="bg-fondo-color h-full w-full box-border md:h-[900px] md:w-8/12 lg:max-w-[675px] md:rounded-small md:mt-2 flex items-center justify-center flex-col ">
        <p className="text-5xl mb-5">Registro</p>
        <form className="w-full px-8" onSubmit={onSubmit}>
          <Input
            type="text"
            label="Nombre"
            name="nombres"
            variant="bordered"
            value={nombres}
            onChange={onInputChange}
          />
          <Input
            type="text"
            label="Apellidos"
            className="pt-5"
            name="apellidos"
            variant="bordered"
            value={apellidos}
            onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefónico"
            className="pt-5"
            name="numero_telefono"
            variant="bordered"
            value={numero_telefono}
            onChange={onInputChange}
          />
          <Input
            type="text"
            label="Dirección"
            className="pt-5"
            name="direccion"
            variant="bordered"
            value={direccion}
            onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero de documento"
            className="pt-5"
            name="numero_identificacion"
            variant="bordered"
            value={numero_identificacion}
            onChange={onInputChange}
          />
          <Input
            type="email"
            label="Email"
            className="pt-5"
            name="email"
            variant="bordered"
            value={email}
            onChange={onInputChange}
          />
          <Input
            type="password"
            label="Contraseña"
            className="pt-5"
            name="password"
            variant="bordered"
            value={password}
            onChange={onInputChange}
          />
          <Button
            type="submit"
            title="Registrar"
            className="w-full mt-5"
            color="primary"
            isLoading={loadingApi}
          >
            Registrar
          </Button>
        </form>
        <Divider className="my-6" />
        <p className="mt-3">
          ¿Ya estas registrado?{" "}
          <Link color="primary" href="/">
            iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

