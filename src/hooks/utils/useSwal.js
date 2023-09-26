import Swal from "sweetalert2";

/**
 * Returns two functions, `alert` and `toast`, for displaying different types of alerts and toasts using the SweetAlert2 library.
 *
 * @returns An object with two functions: `alert` and `toast`.
 *
 * @function`Alert`
 * Displays a customizable alert dialog using the SweetAlert2 library.
 *
 * @param SwalProps - An object that contains the properties for configuring the alert dialog.
 * @param SwalFunction - An optional object that contains the callback functions to be executed based on the user's response to the alert dialog.
 *
 * @example
 * const SwalProps = {
 *   text: "This is an alert message",
 *   icon: "warning",
 *   showCancelButton: true,
 *   showDenyButton: true,
 *   timer: 5000,
 *   position: "center",
 * };
 *
 * const SwalFunction = {
 *   callbackConfirmed: () => {
 *     console.log("Confirmed");
 *   },
 *   callbackDenied: () => {
 *     console.log("Denied");
 *   },
 *   callbackCancel: () => {
 *     console.log("Cancelled");
 *   },
 * };
 *
 * alert(SwalProps, SwalFunction);
 *
 *
 *@function`Toast`
 *  Displays a customizable alert dialog using the SweetAlert2 library.
 * @param SwalProps - An object that contains the properties for configuring the toast message.
 * @param SwalProps.text - The text to be displayed in the toast message.
 * @param SwalProps.icon - The icon to be displayed in the toast message.
 * @param SwalProps.timer - The duration in milliseconds for which the toast message will be displayed. Default is 1500 milliseconds.
 * @param SwalProps.position - The position of the toast message on the screen. Default is "top-end".
 *
 * @example
 * const SwalProps = {
 *   text: "This is a toast message",
 *   icon: "success",
 *   timer: 3000,
 *   position: "top-right",
 * };
 *
 * toast(SwalProps);
 */
export const useSwal = () => {
  const alert = (SwalProps, SwalFunction) => {
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

  const toast = (SwalProps) => {
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
