import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="bg-cuc h-full w-full md:h-3/6 md:w-6/12 md:rounded-small flex items-center justify-center flex-col">
        <p className="text-5xl mb-6">Registro</p>
        <form className="w-full px-8" >
          <Input
            type="text"
            label="Nombre"
            name="name"
            //value={email}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Apellidos"
            className="py-5"
            name="apellidos"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Direccion"
            className="py-5"
            name="direccion"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Tipo Documento"
            className="py-5"
            name="id_tipo_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero de documento"
            className="py-5"
            name="numero_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefonico"
            className="py-5"
            name="numero_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefonico"
            className="py-5"
            name="numero_documento"
            //asdasd
            //value={password}
            //onChange={onInputChange}
          />
          <Input
            type="text"
            label="Numero telefonico"
            className="py-5"
            name="numero_documento"
            //value={password}
            //onChange={onInputChange}
          />
          <Button
            type="submit"
            title="Iniciar Sección"
            className="w-full bg-cuc-dorado hover:bg-cuc-dorado-hover"
          >
            Registrar
          </Button>
        </form>
        <Divider className="my-6" />
        <p className="mt-3">
          ¿Ya estas registrado?{" "}
          <Link href="/" className="text-cuc-dorado">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

export default page
