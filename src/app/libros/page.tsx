"use client";
import CompNavbar from "@/components/CompNavbar";
import CompCard from "@/components/CompCard";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/utils";

interface Libro {
  id: number;
  autor: string;
  foto: string;
  titulo: string;
  descripcion: string;
  disponibilidad: number;
  estado: boolean;
}
export default function Home() {
  //const { libros } = useMyContext();
  const [libros, setLibros] = useState<Libro[]>([]);
  const {loadApi} = useApi();
  useEffect(() => {
    const getLibros= async() =>{
      try {
        
      
     const data= await loadApi({
        endpoint:'/libros',
        type:'GET',
        token: true,

      });
      console.log(data);
    } catch (error) {
        console.log(error)
    }
    }
    getLibros();

  }, [])
  
  return (
    <main>
      <CompNavbar />
      <div className="w-[90%] flex justify-around flex-wrap m-auto mt-6 gap-6">
        {libros.map((libro) => {
          return <CompCard key={libro.id} datos={libro} />;
        })}
      </div>
      <div className="w-[88%] m-auto my-[5%] flex justify-end">
        <Link as={NextLink} href="/libros/editar">
          <Button variant="flat" color="primary" className="mx-4">
            Editar
          </Button>
        </Link>
        <Link as={NextLink} href="/libros/crudLibros">
          <Button variant="flat" color="secondary">
            Agregar
          </Button>
        </Link>
      </div>
    </main>
  );
}
