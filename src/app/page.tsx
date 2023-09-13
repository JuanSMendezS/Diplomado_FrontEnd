"use client";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import useLogin from "@/hooks/views/useLogin";

export default function Login() {
const {email,onInputChange,onSubmit,password} = useLogin();

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <div className="bg-cuc h-full w-full md:h-3/6 md:w-6/12 md:rounded-small flex items-center justify-center flex-col">
        <p className="text-5xl mb-6">Login</p>
        <form className="w-full px-8" onSubmit={onSubmit}>
          <Input
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <Input
            type="Password"
            label="Contraseña"
            className="py-5"
            name="password"
            value={password}
            onChange={onInputChange}
          />
          <Button
            type="submit"
            title="Iniciar Sección"
            className="w-full bg-cuc-dorado hover:bg-cuc-dorado-hover"
          >
            Iniciar Sección
          </Button>
        </form>
        <Divider className="my-6" />
        <p className="mt-3">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/register" className="text-cuc-dorado">
            Registrarte
          </Link>
        </p>
      </div>
    </main>
  );
}
