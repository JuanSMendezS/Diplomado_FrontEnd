import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Link,
  Button,
} from "@nextui-org/react";
import { useLogin } from "../hooks/pages";
import { MailIcon } from "../Icons/MailIcon";
import { LockIcon } from "../Icons/LockIcon";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useState } from "react";

export default function CompModal() {
  const {
    email,
    onInputChange,
    password,
    isOpen,
    onOpen,
    onOpenChange,
    SignIn,
    loading,
  } = useLogin();

  //para poder manejar que primero pida el correo y el nombre, despues si existen, renderize otros inputs y otro boton
  const [render, setRender] = useState(true);
  //funcin ficticia para renderizar los otros campos
  const handleClickButton = () => {
    setRender(!render);
    console.log(render);
  };
  return (
    <>
      <Link onPress={onOpen}>Recuperar Contraseña</Link>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Recuperar Contraseña
              </ModalHeader>
              <ModalBody>
                {render ? (
                  <Input
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Correo Registrado"
                    name="email"
                    onChange={onInputChange}
                    value={email}
                    placeholder="Ingresa tu correo"
                    variant="bordered"
                    className="outline-red-600"
                  />
                ) : (
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Contraseña"
                    placeholder="Ingresa tu nueva contraseña"
                    type="password"
                    name="password"
                    onChange={onInputChange}
                    value={password}
                    variant="bordered"
                  />
                )}

                {render ? (
                  <Input
                    endContent={
                      <AccountCircleRoundedIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Nombre registrado"
                    placeholder="Ingresa tu nombre"
                    type="text"
                    name="password"
                    onChange={onInputChange}
                    value={password}
                    variant="bordered"
                  />
                ) : (
                  <Input
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Contraseña"
                    placeholder="Confirma tu contraseña"
                    type="password"
                    name="password"
                    variant="bordered"
                  />
                )}
              </ModalBody>
              <ModalFooter>
                {render ? (
                  <Button
                    color="secondary"
                    variant="ghost"
                    isLoading={loading}
                    onPress={() => handleClickButton()}
                  >
                    Recuperar
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="ghost"
                    isLoading={loading}
                    onPress={() => handleClickButton()}
                  >
                    Guardar Cambios
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
