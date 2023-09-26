"use client";
import React, { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./AuthReducer";
import { useApi, useSwal } from "@/hooks/utils";
import Cookies from "universal-cookie";
import useLocalStorage from "@/hooks/utils/useLocalStorage";

export interface IUserProps {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  numero_identificacion: string;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IGeneralProps {
  id: number;
  nombre: string;
}

interface IModulosAcciones {
  id: number;
  id_acciones: number;
  id_modulos: number;
  modulos: IGeneralProps;
  acciones: IGeneralProps;
}

export interface IPermisosProps {
  id: number;
  grupoUsuarios: IGeneralProps;
  modulosAcciones: IModulosAcciones;
}

interface IContextProps {
  user: IUserProps | null;
  permisos: IPermisosProps[] | null;
  signIn: (loginData: ILoginData) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<IContextProps>({} as IContextProps);


export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const {state:inicialValue}= useLocalStorage("state",{
    user: {
      apellidos: "",
      email: "",
      nombres: "",
      numero_identificacion: "",
      id: 0,
    },
    permisos: [],
  });
  
  const [state, dispatch] = useReducer(authReducer, inicialValue);
  const { errorApi, loadApi, loadingApi } = useApi();
  const { toast } = useSwal();
  const cookies = new Cookies();
  const signIn = (loginData: ILoginData): boolean => {
    const requestAPI = async () => {
      try {
        const { data }:any = await loadApi({
          endpoint: "usuarios/signin",
          type: "POST",
          body: loginData,
        });
        const { user, permisos,token } = data.data;
        cookies.set('token',token)
        dispatch({ type: "signIn", payload: { user, permisos } });
        window.location.replace("/libros")
      } catch (error) {
        console.log(error);
      }
    };
    requestAPI();
    return loadingApi;
  };
  const logout = () => {
    dispatch({ type: "logout" });
    window.location.replace("/");
  };

  useEffect(() => {
    if (errorApi !== "") {
      toast({
        text: errorApi,
        icon: "error",
        position: "top",
      });
    }
  }, [errorApi]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
