import { useEffect, useState } from "react";
import { useApi, useSwal } from "../utils";

export const usePrestamos =()=>{
    const [prestamos, setPrestamos] = useState([]);
    const { errorApi, loadApi, loadingApi } = useApi();
    const { toast } = useSwal();
  
    const getPrestamos = async () => {
      try {
        const { data } = await loadApi({
          token: true,
          type: "post",
          endpoint: "libros/get-loan-book",
        });
        if (data.estado) {
          setPrestamos(data.loanBooks);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const devolver = async (id) => {
      try {
        const { data } = await loadApi({
          token: true,
          type: "post",
          endpoint: "libros/return-book",
          body: { id },
        });
        if (data.estado) {
          const list = prestamos.map((item) => {
            if (item.id === data.prestamo.id) {
              item.fecha_devolucion = data.prestamo.fecha_devolucion;
            }
            return item;
          });
          setPrestamos(list);
          toast({
            icon: "success",
            text: "Se realizo la devolución con éxito!",
            position: "top",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getPrestamos();
    }, []);
  
    useEffect(() => {
      if (errorApi) {
        toast({ icon: "error", text: errorApi });
      }
    }, [errorApi]);
  
    const dateFormat = (date) => {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return {
        dateFormat,
        devolver,
        loadingApi,
        prestamos
    }
}