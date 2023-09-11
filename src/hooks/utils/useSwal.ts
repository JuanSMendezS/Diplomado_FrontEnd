import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

//Interfase para los mensajes
interface ISwalProps {
  text: string;
  icon: SweetAlertIcon;
  showCancelButton?: boolean;
  showDenyButton?: boolean;
  timer?: number;
  position?: SweetAlertPosition;
}

//Interface para la funciones se gun el estado
interface ISwalFunction {
  callbackConfirmed?: Function;
  callbackDenied?: Function;
  callbackCancel?: Function;
}
export const useSwal = () => {
  //alerta con confirmaciones
  const alert = (SwalProps: ISwalProps, SwalFunction?: ISwalFunction) => {
    Swal.fire({
      ...SwalProps,
      confirmButtonText: "Aceptar",
      denyButtonText: "No",
      background: "#212121",
      color: "#fff",
      confirmButtonColor: "#c79e32",
      cancelButtonColor: "#9c2e38",
    }).then(({ isConfirmed, isDenied }) => {
      if (SwalFunction) {
        const { callbackConfirmed, callbackCancel, callbackDenied } =
          SwalFunction;

        if (isConfirmed) {
          callbackConfirmed && callbackConfirmed();
        } else if (isDenied) {
          callbackDenied && callbackDenied();
        } else {
          callbackCancel && callbackCancel();
        }
      }
    });
  };

  //alerta de mensajes
  const toast = (SwalProps: ISwalProps) => {
    const { timer, position } = SwalProps;
    Swal.fire({
      ...SwalProps,
      showConfirmButton: false,
      background: "#212121",
      color: "#fff",
      toast: true,
      timer: timer ? timer : 1500,
      position: position ? position : "top-end",
    });
  };

  return { alert, toast };
};
