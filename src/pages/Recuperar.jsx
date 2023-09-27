import { Input, Button, Divider } from "@nextui-org/react";
const Recuperar = () => {
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="bg-fondo-color w-full m-auto box-border sm:w-[38%] sm:h-auto md:rounded-small md:mt-2 flex items-center justify-center flex-col text-center ">
        <p className="text-5xl my-5">Reestablecer Contraseña</p>
        <form className="w-full px-8" onSubmit="">
          <Input
            type="password"
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            name="contraseña"
            variant="bordered"
            //value={contraseña}
            //onChange={onInputChange}
          />
          <Input
            type="password"
            label="Confirmacion"
            placeholder="Confirma la nueva contraseña"
            className="pt-5"
            name="contraseña2"
            variant="bordered"
            //value={contraseña2}
            //  onChange={onInputChange}
          />
          <Button
            type="submit"
            title="recuperar password"
            className="w-full mt-5"
            color="primary"
          >
            Recuperar
          </Button>
        </form>
        <Divider className="my-6" />
      </div>
    </div>
  );
};

export default Recuperar;
