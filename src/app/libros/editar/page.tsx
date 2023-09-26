"use client";
import React from "react";
import { useMyContext } from "@/hooks/MyProvider";
import CompTabla from "@/components/CompTabla";
import CompNavbar from "@/components/CompNavbar";

export default function App() {
  const { libros } = useMyContext();
  return (
    <>
      <CompNavbar />
      <CompTabla libros={libros} />
    </>
  );
}
