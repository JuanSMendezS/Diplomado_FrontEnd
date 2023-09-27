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

export default function CompModal() {
  const {
    email,
    onInputChange,
   // password,
    isOpen,
    onOpen,
    onOpenChange,
   // SignIn,
    loading,
  } = useLogin();

  return (
    <>
      <Link onPress={onOpen}>Recuperar Contraseña</Link>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Recuperar Contraseña
              </ModalHeader>
              <ModalBody>
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

              </ModalBody>
              <ModalFooter>
                  <Button
                    color="secondary"
                    variant="ghost"
                    isLoading={loading}
                    onPress={() =>{}}
                  >
                    Recuperar
                  </Button>
               
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
