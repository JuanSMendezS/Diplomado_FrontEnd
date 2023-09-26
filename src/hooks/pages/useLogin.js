import { useDisclosure } from "@nextui-org/react";
import { useForm, useSwal } from "../utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const useLogin = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { toast } = useSwal();
  const [loading, setLoading] = useState(false);
  const { onInputChange, resetForm, formState } = useForm({
    email: "",
    password: "",
  });

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const SignIn = () => {
    if (!formState.email) {
      toast({ icon: "warning", text: "Debe ingresar el email." });
      return;
    }
    if (!formState.password) {
      toast({ icon: "warning", text: "Debe ingresar la contraseña." });
      return;
    }
    setLoading(signIn(formState));
  };

  return {
    onOpen,
    isOpen,
    onOpenChange,
    ...formState,
    onInputChange,
    SignIn,
    loading,
  };
};
