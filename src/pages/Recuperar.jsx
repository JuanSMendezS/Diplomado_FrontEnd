import { Input, Button, Divider } from "@nextui-org/react";
import { useRecuperar } from "../hooks/pages/useRecuperar";
export const Recuperar = () => {
const {changePassword,loadingApi,onInputChange,password,passwordConfirmation}=useRecuperar();
  return (
    <div className="w-screen flex items-center justify-center">
      <div className="bg-fondo-color w-full m-auto box-border sm:w-[38%] sm:h-auto md:rounded-small md:mt-2 flex items-center justify-center flex-col text-center ">
        <p className="text-5xl my-5">Restablecer Contraseña</p>
        <form className="w-full px-8" onSubmit={changePassword}>
          <Input
            type="password"
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            name="password"
            variant="bordered"
            value={password}
            onChange={onInputChange}
          />
          <Input
            type="password"
            label="Confirmación"
            placeholder="Confirma la nueva contraseña"
            className="pt-5"
            name="passwordConfirmation"
            variant="bordered"
            value={passwordConfirmation}
            onChange={onInputChange}
          />
          <Button
            type="submit"
            title="recuperar password"
            className="w-full mt-5"
            color="primary"
            isLoading={loadingApi}
          >
            Recuperar
          </Button>
        </form>
        <Divider className="my-6" />
      </div>
    </div>
  );
};
