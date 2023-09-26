import { useForm, useSwal } from "@/hooks/utils";
import { FormEvent, useContext, useEffect} from "react";
import { AuthContext } from "@/context/AuthContext";
import Cookies from "universal-cookie";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

/**
 * Custom hook that handles the login functionality in a React application.
 * It utilizes other custom hooks such as `useForm`, `useSwal`, and `useApi` to manage form state, display alerts, and make API requests.
 *
 * @returns {Object} An object containing the necessary variables and functions to be used in the login component.
 * @property {Function} onSubmit - A function to handle the form submission.
 * @property {Function} onInputChange - A function to handle input changes.
 * @property {string} email - The current value of the email input field.
 * @property {string} password - The current value of the password input field.
 */
const useLogin = () => {
 
  const { formState, onInputChange } = useForm({
    email: "",
    password: "",
  });
  const { signIn } = useContext(AuthContext);
  const { toast } = useSwal();
  let loadingApi = false;


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
        position: "top",
      });
      return;
    }
    loadingApi = signIn(formState);
  };
  
  useEffect(() => {
    const token:string = new Cookies().get('token') ||'';
    if (token.length>0) {
      redirect('/dashboard',RedirectType.push)
    }

  }, [])
  

  return {
    onSubmit,
    onInputChange,
    loadingApi,
    ...formState,
  };
};

export default useLogin;
