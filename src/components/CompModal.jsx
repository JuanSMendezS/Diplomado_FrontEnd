import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Link,
  Button
} from "@nextui-org/react";
import { useLogin } from "../hooks/pages/";
import { MailIcon } from "../Icons/MailIcon";
import { LockIcon } from "../Icons/LockIcon";
import * as Router from "react-router-dom";

export default function CompModal() {
const {email,onInputChange,password, isOpen, onOpen, onOpenChange,SignIn,loading } = useLogin();
  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="flat">
        Iniciar Sesión
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Correo"
                  name="email"
                  onChange={onInputChange}
                  value={email}
                  placeholder="Ingresa tu correo"
                  variant="bordered"
                  className="outline-red-600"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                  name="password"
                  onChange={onInputChange}
                  value={password}
                  variant="bordered"
                />
                <div className="flex flex-row justify-between w-auto">
                  <Link
                    color="primary"
                    href="/registrarse"
                    size="sm"
                  >
                    Registrarse
                  </Link>
                  <Link color="primary" href="#" size="sm" as={Router.Link}>
                    Recuperar contraseña
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="secondary" variant="ghost" isLoading={loading} onPress={SignIn}>
                  Ingresar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
