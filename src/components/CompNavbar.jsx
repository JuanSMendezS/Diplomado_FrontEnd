import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  Image,
  Link,
} from "@nextui-org/react";
import { useNavbar } from "../hooks/pages/";
import CompModal from "./CompModal";

export default function CompNavbar() {
  const { isMenuOpen, logout, menuItems, setIsMenuOpen, token } = useNavbar();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="mb-6">
      <div
        className="w-[90%] m-auto flex items-center"
        style={{ justifyContent: "space-between" }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand as={Link} href="/">
            <Image
              src="https://www.cuc.edu.co/wp-content/uploads/2022/05/Diseno-sin-titulo-18.png"
              width={60}
            />
            <p className="font-bold text-inherit text-white ml-5">Biblioteca CUC</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((menuItem, index) => {
            return (
              <NavbarItem key={index}>
                <Link
                  href={menuItem.href}
                  underline="focus"
                  className="text-white hover:text-violet-500"
                >
                  {menuItem.label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        <NavbarContent justify="end">
          {token.length <= 0 ? (
            <CompModal />
          ) : (
            <Button onClick={logout} color="warning" variant="flat">
              Cerrar Sesión
            </Button>
          )}
        </NavbarContent>
      </div>
      <NavbarMenu className="mt-7">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-white hover:text-violet-500"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
