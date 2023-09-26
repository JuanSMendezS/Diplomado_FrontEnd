"use client";
import React, { useContext, useState } from "react";
import CompModal from "@/components/CompModal";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { AcmeLogo } from "@/Icons/AcmeLogo";
import { ConfiIcon } from "@/Icons/ConfigIcon";
import { AuthContext } from "@/context/AuthContext";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    { label: "Perfil", href: "/perfil", activo: false },
    { label: "Home", href: "/", activo: false },
    { label: "Libros", href: "/libros", activo: false },
    { label: "Devoluciones", href: "/devoluciones", activo: false },
    { label: "Cerrar sesión", href: "/cerrar-sesion", activo: false },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="my-6">
      <div className="w-[90%] m-auto flex items-center">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">BiblioCUC</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((menuItem, index) => {
            return (
              <NavbarItem key={index}>
                <Link
                  href={menuItem.href}
                  as={NextLink}
                  underline="focus"
                  className={"text-white hover:text-violet-500"}
                >
                  {menuItem.label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <ConfiIcon />
          </NavbarItem>
          <NavbarItem>
            <CompModal />
          </NavbarItem>
        </NavbarContent>
      </div>
      <NavbarMenu className="mt-7">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-white hover:text-violet-500"
              href={item.href}
              size="lg"
              as={NextLink}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
