import { redirect } from "next/navigation";
import { useForm, useSwal, useApi } from "@/hooks/utils";
import { FormEvent, useEffect } from "react";
const useLogin = () => {
    const {  formState, onInputChange } = useForm({
        email: "",
        password: "",
      });
      const { toast } = useSwal();
      const { errorApi, loadApi, loadedApi } = useApi();
    
      const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formState.email.trim()) {
          toast({
            text: "Debe ingresar el email.",
            icon: "warning",
            position: "top",
          });
          return;
        }
        if (!formState.password.trim()) {
          toast({
            text: "Debe ingresar la contraseña.",
            icon: "warning",
            position: "center",
          });
          return;
        }
        signIn();
      };
    
      const signIn = () => {};
    
      const validateSession =  () => {
        if (loadedApi) {
          loadApi({
            endpoint: "sesiones/validar-sesion",
            token: true,
            type: "GET",
          })
            .then(({ data: { estado } }) => {
              if (estado) {
                redirect("dashboard");
                console.log("dashboard");
              } else {
                redirect("/");
                console.log("LOGIN");
              }
            })
            .catch((error) => console.log(error, errorApi));
        }
      };
    
      useEffect(() => {
        validateSession();
      }, []);
  return {
        onSubmit,
        onInputChange, 
        ...formState,
    }
}

export default useLogin
