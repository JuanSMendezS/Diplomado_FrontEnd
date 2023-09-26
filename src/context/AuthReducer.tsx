import Cookies from "universal-cookie";
import { IPermisosProps, IUserProps } from "./AuthContext";

const cookies = new Cookies();
export interface IAuthState {
  permisos: IPermisosProps[] | null;
  user: IUserProps | null;
}

type AuthAction =
  | { type: "signIn"; payload: { user: IUserProps; permisos: IPermisosProps[] } }
  | { type: "logout" };

const signIn = (data: IAuthState) => {
  localStorage.setItem("state", JSON.stringify(data));
};

const logout = () => {
  localStorage.removeItem("state");
  cookies.remove('token')
};

export const authReducer = (
  state: IAuthState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case "signIn":
      signIn(action.payload);
      return {
        ...state,
        permisos: action.payload.permisos,
        user: action.payload.user,
      };
    case "logout":
      logout();
      return {
        ...state,
        user: null,
        permisos: null,
      };
    default:
      return state;
  }
};
