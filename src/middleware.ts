import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from "universal-cookie";
// import { useApi } from "./hooks/utils";
const cookie = new Cookies();

export const middleware = async (request: NextRequest) => {
  // const { loadApi } = useApi();
  const token = cookie.get("token") === null && "";
  console.log("toke:", token);
  if (!token) return NextResponse.redirect(new URL("/", request.url));
/*
  const validateSession = async () => {
    const {
      data: { estado },
    } = await loadApi({
      endpoint: "sesiones/validar-sesion",
      token: true,
      type: "GET",
    });
    if (!estado) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  };
*/
  return NextResponse.next();// await validateSession();
};

export const config = {
  matcher: "/dashboard/:path*", //cambiar los las rutas protegidas
};
