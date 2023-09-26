import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Cookies from "universal-cookie";

export const useNavbar = () => {
  const cookies = new Cookies();
  const token = cookies.get("token") || "";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = token
    ? [
        { label: "Libros", href: "/libros", activo: false },
        { label: "Devoluciones", href: "/devoluciones", activo: false },
        { label: "Perfil", href: "/perfil", activo: false },
      ]
    : [];

  const { logout } = useContext(AuthContext);
  return {
    logout,
    menuItems,
    isMenuOpen,
    token,
    setIsMenuOpen,
  };
};
