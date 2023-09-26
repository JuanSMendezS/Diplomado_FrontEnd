"use client";
import React, { useContext, useEffect } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { MailIcon } from "@/Icons/MailIcon.jsx";
import { LockIcon } from "@/Icons/LockIcon";
import { useForm } from "@/hooks/utils";
import { AuthContext } from "@/context/AuthContext";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { password, email, onInputChange, resetForm, formState } = useForm({
    email: "",
    password: "",
  });

  const {signIn}=useContext(AuthContext);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);



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
                    as={NextLink}
                  >
                    Registrarse
                  </Link>
                  <Link color="primary" href="#" size="sm" as={NextLink}>
                    Recuperar contraseña
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="secondary" variant="ghost" onPress={()=>signIn(formState)}>
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
