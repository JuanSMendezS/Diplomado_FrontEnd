"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
//import { buscar } from "../../api";

export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  foto: string;
  descripcion: string;
  disponiblidad: number;
  estado: number;
}

// Define el tipo para los datos en el contexto
type MyContextData = {
  libros: Libro[];
  buscarLibro: (id: string) => void;
  libroEditar: any;
};

// Crea el contexto con el tipo definido
const MyContext = createContext<MyContextData | undefined>(undefined);

// Hook personalizado para usar el contexto
export function useMyContext(): MyContextData {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error(
      "useMyContext debe ser usado dentro de un proveedor MyProvider"
    );
  }

  return context;
}

// Proveedor de contexto
interface MyProviderProps {
  children: ReactNode;
}

export function MyProvider({ children }: MyProviderProps): JSX.Element {
  //para traer los libros desde el Json
  const [libros, setLibros] = useState<any[]>([]);
  const [libroEditar, setEditar] = useState<Libro>();
  useEffect(() => {
    // buscar("/libros", setLibros);
  }, []);

  // buscar el libro
  const buscarLibro = (id: string) => {
    const libroEncontrado = libros.find((libro) => libro.id === id);

    if (libroEncontrado) {
      setEditar(libroEncontrado);
      console.log("quieres modificar el libro", libroEncontrado.titulo);
      window.location.href = `/libros/editar/${id}`;
      // Puedes hacer cualquier otra cosa que necesites con el libro encontrado
    } else {
      console.log("No se encontró un libro con el ID:", id);
    }
  };

  //lo que puedo acceder desde el context
  const contextValue = {
    libros,
    buscarLibro,
    libroEditar,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}
