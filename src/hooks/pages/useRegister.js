import { useContext, useEffect } from "react";
import { useApi, useForm, useSwal } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const useRegister = () => {
  const { formState, onInputChange, changeInicialForm } = useForm({
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
  const { user, updateUser } = useContext(AuthContext);
  const params = useParams();
  const id = params?.id;

  const onSubmit = async (e) => {
    e.preventDefault();
    const { nombres, apellidos, email, password, numero_identificacion } =
      formState;
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
        history("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    const { nombres, apellidos, email, password, numero_identificacion } =
      formState;
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
        body: formState,
        token: true,
        type: "put",
        endpoint: "usuarios/" + id,
      });
      console.log(data);
      if (data.estado) {
        toast({
          icon: "success",
          text: "Datos actualizados con éxito.",
          position: "top",
        });
        //acutalizar en el state global
        const newData = { ...formState, id };
        delete newData.password;
        updateUser(newData);
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

  useEffect(() => {
    if (id) {
      console.log(user);
      changeInicialForm(user);
    }
  }, [id]);

  return {
    ...formState,
    onSubmit,
    loadingApi,
    onInputChange,
    id,
    updateData,
  };
};
