import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export const middleware = async (request: NextRequest) => {

  const token = request.cookies.get('token')?.value || "";

  if (!token) {
    request.cookies.delete('token')
    return NextResponse.redirect(new URL("/", request.url));
  }

  const validateSession = async () => {
    try {
      const server = process.env.BACKEND_URL;
      const { estado } = await fetch(`${server}/api/sesiones/validar-sesion`, {
        headers: {
          "access-token": `${token}`,
        },
      }).then((response) => response.json());
  
      if (!estado) {
        request.cookies.delete('token')
        return NextResponse.redirect(new URL("/",request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.log(error);
      request.cookies.delete('token')
      return NextResponse.next();
    }
  };

  return await validateSession()//NextResponse.next();
};

export const config = {
  matcher: "/dashboard/:path*", //cambiar los las rutas protegidas
};
