import { useState } from "react";
import { useSwal } from "./useSwal";

/**
 * Custom hook that manages the state of a form.
 * @template T - The type of the initial form object.
 * @param {T} initialForm - The initial state of the form as an object.
 * @returns {Object} - An object containing the form state, a function to handle input changes, and the current form state.
 *
 * @example
 * const initialForm = {
 *   name: "",
 *   email: "",
 *   password: "",
 * };
 *
 * const MyComponent = () => {
 *   const { name, email, password, onInputChange } = useForm(initialForm);
 *
 *   const handleSubmit = () => {
 *     // handle form submission
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input type="text" name="name" value={name} onChange={onInputChange} />
 *       <input type="email" name="email" value={email} onChange={onInputChange} />
 *       <input type="password" name="password" value={password} onChange={onInputChange} />
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * };
 */
export const useForm = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);
  const { toast } = useSwal();
  const onInputChange = ({ target }, file = false) => {
    if (!file) {
      const { name, value } = target;
      setFormState({
        ...formState,
        [name]: value,
      });
    } else {
      const { name, files } = target;
      if (files.length > 1) {
        toast({
          text: "solo puede cargar una archivo a la vez",
          icon: "warning",
        });
        return;
      }
      setFormState({
        ...formState,
        [name]: { file: files[0], url: URL.createObjectURL(files[0]) },
      });
    }
  };
  const resetForm = () => {
    setFormState(initialForm);
  };
  const changeInicialForm = (data) => {
    setFormState(data);
  };
  return {
    ...formState,
    formState,
    resetForm,
    onInputChange,
    changeInicialForm
  };
};
