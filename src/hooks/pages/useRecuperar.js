import { useNavigate, useParams } from "react-router-dom";
import { useApi, useForm, useSwal } from "../utils";
import { useEffect } from "react";

export const useRecuperar=()=>{
    const { password, passwordConfirmation, onInputChange } = useForm({
        password: "",
        passwordConfirmation: "",
      });
      const {token} = useParams();
      const {toast}=useSwal();
      const {errorApi,loadApi,loadingApi} = useApi();
      const history=useNavigate();
      const changePassword = async(e)=>{
        e.preventDefault();
        if (!password) {
            toast({text: 'Debe ingresar al nueva contraseña.', icon:'warning', position:'top'})
          return;
        }
        if (password !== passwordConfirmation) {
          toast({text: 'Las contraseña no conceden.', icon:'warning', position:'top'})
          return;
        }
        const {data} = await loadApi({
          token:true,
          type:'post',
          manualToken:token,
          endpoint:'usuarios/change-password/',
          body:{password}
        });
        
        if (data.estado) {
          toast({text: data.msg, icon:'success', position:"top"})
          history('/')
        }
    
      }
    
      useEffect(() => {
        if (errorApi) {
          toast({text: errorApi, icon:'error', position:'top'})
        }
      }, [errorApi]);
    return{
        password,
        passwordConfirmation,
        changePassword,
        loadingApi,
        onInputChange
    }
}