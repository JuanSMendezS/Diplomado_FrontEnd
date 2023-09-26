
import { useEffect } from "react";
import { useApi, useForm, useSwal } from "../utils";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { formState, onInputChange } = useForm({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    numero_identificacion: "",
    numero_telefono: "",
    direccion: "",
  });
  const { toast, alert } = useSwal();
  const { loadApi, errorApi, loadingApi } = useApi();
  const history = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      nombres,
      apellidos,
      email,
      password,
      numero_identificacion,
    } = formState;
    if (!nombres) {
      toast({
        icon: "warning",
        text: "Debe ingresar los nombres",
        position: "top",
      });
      return;
    }
    if (!apellidos) {
      toast({
        icon: "warning",
        text: "Debe ingresar los apellidos",
        position: "top",
      });
      return;
    }
    if (!numero_identificacion) {
      toast({
        icon: "warning",
        text: "Debe ingresar el numero de documento",
        position: "top",
      });
      return;
    }
    if (!email) {
      toast({
        icon: "warning",
        text: "Debe ingresar el email",
        position: "top",
      });
      return;
    }
    if (!password) {
      toast({
        icon: "warning",
        text: "Debe ingresar la contraseña",
        position: "top",
      });
      return;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(
        password
      )
    ) {
      alert({
        icon: "warning",
        text: `La contraseña no cumple con lo requisito de seguridad: 
            Mínimo 8 caracteres
            Máximo 15 caracteres
            Al menos una letra mayúscula
            Al menos una letra minúscula
            Al menos un dígito
            No espacios en blanco`,
        position: "top",
      });
      return;
    }
    try {
      const { data } = await loadApi({
        type: "POST",
        endpoint: "usuarios",
        body: formState,
      });
      if (data.estado) {
        alert({ icon: "success", text: "Usuario Registrado con éxito." });
        history('/')
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (errorApi) {
      alert({ text: errorApi, icon: "error" });
    }
  }, [errorApi]);

  return{
    ...formState,
    onSubmit,
    loadingApi,
    onInputChange
  }
};
