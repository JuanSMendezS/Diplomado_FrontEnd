import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "universal-cookie";
import axios from "axios";
const cookie = new Cookies();

export const middleware = async (request: NextRequest) => {
  const token = cookie.get("token") === null && "";

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  const validateSession = async () => {
    try {
      const server = process.env.BACKEND_URL;
      console.log(server);
      const { estado } = await fetch(`${server}/api/sesiones/validar-sesion`, {
        headers: {
          "access-token": `${token}`,
        },
      }).then((response) => response.json());

      if (!estado) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      return NextResponse.next();
    }
  };

  return await validateSession();
};

export const config = {
  matcher: "/dashboard/:path*", //cambiar los las rutas protegidas
};
