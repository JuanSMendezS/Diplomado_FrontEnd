import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./AuthReducer";
import { useApi, useSwal, useLocalStorage } from "../hooks/utils";
import Cookies from "universal-cookie";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const { state: inicialValue } = useLocalStorage("state", {
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

  const signIn = (loginData) => {
    const requestAPI = async () => {
      try {
        const { data } = await loadApi({
          endpoint: "usuarios/signin",
          type: "POST",
          body: loginData,
        });

        const { user, permisos, token } = data.data;
        cookies.set("token", token,{expires:'1d'});
        const newData = { user, permisos };
        localStorage.setItem("state", JSON.stringify(newData));
        dispatch({ type: "signIn", payload: newData });

        window.location.replace("/libros");
      } catch (error) {
        console.log(error);
      }
    };
    requestAPI();
    return loadingApi;
  };
  const logout = () => {
    localStorage.removeItem("state");
    cookies.remove("token", {path:'/'});
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
